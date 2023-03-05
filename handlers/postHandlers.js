const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./ncufresh-homework.db');

exports.createPost = (req, res) => {
  const { title, content } = req.body;
  const token = req.headers.authorization;

  db.get('SELECT id FROM USERS WHERE token = ?', [token], (err, row) => {
    if (err) {
      res.status(500).send('Internal server error');
      return;
    }

    if (!row) {
      res.status(401).send('Invalid token');
      return;
    }

    const author_id = row.id;
    db.run('INSERT INTO POSTS (title, content, author_id) VALUES (?, ?, ?)', [title, content, author_id], err => {
      if (err) {
        res.status(500).send('Internal server error');
        return;
      }

      res.json({ message: 'Post created successfully' });
    });
  });
};

exports.getAllPosts = (req, res) => {
  // 根據 id 由大到小排序，從 POSTS 資料表中取出所有文章
  db.all('SELECT * FROM POSTS ORDER BY id', [], (err, rows) => { 
    if (err) {
      res.status(500).send('Internal server error');
      return;
    }

    // 將每一篇文章格式化成物件，加進一個陣列裡
    const posts = rows.map(row => {
      return {
        id: row.id,
        title: row.title,
        content: row.content,
        author_id: row.author_id
      };
    });

    // 將包含所有文章的陣列，轉換成 JSON 格式後回傳
    res.json(posts); 
  });
};

exports.getOneUserPosts = (req, res) => {
  const token = req.headers.authorization;

  const {userId} = req.params;

  // 先確認傳入的 token 是否合法
  db.get('SELECT id FROM USERS WHERE id = ?', [userId], (err, row) => {
    if (err) {
      res.status(500).send('Internal server error');
      return;
    }

    if (!row) {
      res.status(401).send('User id not exist');
      return;
    }

    // 如果 token 合法，就可以取得所有的 post 了
    db.all('SELECT * FROM POSTS WHERE author_id = ?', [userId], (err, rows) => {
      if (err) {
        res.status(500).send('Internal server error');
        return;
      }

      // 將所有的 post 包在一個物件裡面，然後回傳給 client 端
      const posts = rows.map(row => ({
        id: row.id,
        title: row.title,
        content: row.content,
        author_id: row.author_id,
      }));
      res.json({ posts });
    });
  });
};

exports.deletePost = (req, res) => {
  const postId = req.params.id; // 取得 URL 中的 post id

  const token = req.headers.authorization; // 從 request headers 取得 token
  console.log('hi');

  // 先檢查使用者是否存在
  db.get('SELECT id FROM USERS WHERE token = ?', [token], (err, userRow) => {
    if (err) {
      // 如果發生錯誤，回傳 500 錯誤訊息
      res.status(500).send('Internal server error');
      return;
    }

    // 如果找不到使用者，回傳 401 錯誤訊息
    if (!userRow) {
      res.status(401).send('Invalid token');
      return;
    }

    const authorId = userRow.id; // 取得該使用者的 id

    // 檢查該使用者是否擁有此 post 的權限
    db.get('SELECT id FROM POSTS WHERE id = ? AND author_id = ?', [postId, authorId], (err, postRow) => {
      if (err) {
        res.status(500).send('Internal server error');
        return;
      }

      if (!postRow) {
        // 如果該使用者無法刪除此 post，回傳 401 錯誤訊息
        res.status(401).send('Unauthorized to delete this post');
        return;
      }

      // 如果擁有刪除權限，就刪除此 post
      db.run('DELETE FROM POSTS WHERE id = ?', [postId], err => {
        if (err) {
          res.status(500).send('Internal server error');
          return;
        }

        res.json({ message: 'Post deleted successfully' });
      });
    });
  });
};

