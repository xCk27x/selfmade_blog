const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = new sqlite3.Database('./ncufresh-homework.db');

exports.getUserInfo = (req, res) => {
  const decoded = req.jwtDecoded;

  const user_id = decoded.id;
  db.get("SELECT * FROM USERS WHERE id = ?", [user_id], (err, row) => {
    if (err) {
      res.status(500).send("Internal server error 1");
      return;
    }

    if (!row) {
      res.status(401).send("Cannot find user");
      return;
    }

    const { username, email } = row;
    res.status(200).json({
      status: 'success',
      message: 'User info has been returned',
      username,
      email,
    });
  });
};

exports.userLogin = (req, res) => {
  const { email, password } = req.body;

  // const token = 'Bearer' + jwt.sign(
  //   {
  //     _id: ,
  //     role: 'user'
  //   },
  //   'ncufresh-secret',
  //   {
  //     expiresIn: 3 * 24 * 3600,
  //   }
  // )

  if (email && password) {
    db.get('SELECT * FROM USERS WHERE email = ?', [email], (err, row) => {
      if (err) {
        res.status(500).send('Internal server error');
        return;
      }

      if (!row) {
        res.status(401).send('Invalid email or password');
        return;
      }

      // compare the password provided by the user with the hash stored in the database
      bcrypt.compare(password, row.password, (err, result) => {
        if (err || !result) {
          res.status(401).send('Invalid email or password');
          return;
        } else {
          req.session.loggedin = true;
          req.session.username = row.username;
          req.session.admin = row.role;
          req.session.userId = row.id;

          const token = jwt.sign(
            {
              id: row.id,
              username: row.username,
              admin: row.role,
            },
            'ncufresh-secret',
            { expiresIn: 3 * 24 * 3600 }
          )

          res.status(200).json({
            status: 'success',
            message: 'User log in successfully',
            token,
          });
        }
      });
    });
  }
};

exports.userRegister = async (req, res) => {
  const { username, email, password } = req.body;
  const role = 'user';

  if (!username || !email || !password) {
    res.status(401).send('Invalid username, email or password');
    return;
  }

  // 檢查使用者名稱是否已存在
  db.get('SELECT * FROM USERS WHERE username = ?', username, (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }

    if (row) {
      return res.status(400).send('Username already exists');
    }

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
      }

      db.run('INSERT INTO USERS (username, email, password, role) VALUES (?, ?, ?, ?)', [username, email, hash, role], (err) => {
        if (err) {
          console.error(err.message);
          return res.status(500).send('Server Error');
        }

        db.get('SELECT * FROM USERS WHERE username = ?', [username], (err, row) => {
          req.session.loggedin = true;
          req.session.username = row.username;
          req.session.admin = row.role;
          req.session.userId = row.id;

          const token = jwt.sign(
            {
              id: row.id,
              username: row.username,
              admin: row.role,
            },
            'ncufresh-secret',
            { expiresIn: 3 * 24 * 3600 }
          );

          return res.status(200).json({
            status: 'success',
            message: 'User registered successfully',
            token,
          });
        });
      });
    });
  });
};