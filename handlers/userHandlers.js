const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const db = new sqlite3.Database('./ncufresh-homework.db');

exports.userRegister = async (req, res) => {
  const { username, password } = req.body;

  // 檢查使用者名稱是否已存在
  db.get('SELECT * FROM USERS WHERE username = ?', username, (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }

    if (row) {
      return res.status(400).send('Username already exists');
    }

    // 新增使用者
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
      }

      db.run('INSERT INTO USERS (username, password) VALUES (?, ?)', [username, hash], (err) => {
        if (err) {
          console.error(err.message);
          return res.status(500).send('Server Error');
        }

        return res.status(200).send('User registered successfully');
      });
    });
  });
};

exports.userLogin = (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT id, password FROM USERS WHERE username = ?', [username], (err, row) => {
    if (err) {
      res.status(500).send('Internal server error');
      return;
    }

    if (!row) {
      res.status(401).send('Invalid username or password 1');
      return;
    }

    // compare the password provided by the user with the hash stored in the database
    bcrypt.compare(password, row.password, (err, result) => {
      if (err || !result) {
        res.status(401).send('Invalid username or password 2');
        return;
      }

      const token = Math.random().toString(36).substr(2);
      db.run('UPDATE USERS SET token = ? WHERE id = ?', [token, row.id], err => {
        if (err) {
          res.status(500).send('Internal server error');
          return;
        }

        res.json({ token });
      });
    });
  });
};
