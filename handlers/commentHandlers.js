const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./ncufresh-homework.db');

exports.createComment = (req, res) => {
  const { content } = req.body;
  const token = req.headers.authorization;
  const post_id = req.params.postId;

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
    db.run('INSERT INTO COMMENTS (content, author_id, post_id) VALUES (?, ?, ?)', [content, author_id, post_id], err => {
      if (err) {
        res.status(500).send('Internal server error');
        return;
      } res.json({ message: 'Comment created successfully' });
    });
  });
};

exports.updateComment = (req, res) => {
  const { content } = req.body;
  const token = req.headers.authorization;
  const commentId = req.params.commentId;

  db.get('SELECT COMMENTS.author_id FROM COMMENTS INNER JOIN USERS ON COMMENTS.author_id = USERS.id WHERE COMMENTS.id = ? AND USERS.token = ?', [commentId, token], (err, row) => {
    if (err) {
      res.status(500).send('Internal server error');
      return;
    }

    if (!row) {
      res.status(401).send('Invalid token or comment ID');
      return;
    }

    const authorId = row.author_id;
    db.run('UPDATE COMMENTS SET content = ? WHERE id = ? AND author_id = ?', [content, commentId, authorId], err => {
      if (err) {
        res.status(500).send('Internal server error');
        return;
      }

      res.json({ message: 'Comment updated successfully' });
    });
  });
};

exports.deleteComment = (req, res) => {
  const { commentId } = req.params;
  const token = req.headers.authorization;

  db.get('SELECT COMMENTS.author_id FROM COMMENTS INNER JOIN USERS ON COMMENTS.author_id = USERS.id WHERE COMMENTS.id = ? AND USERS.token = ?', [commentId, token], (err, row) => {
    if (err) {
      res.status(500).send('Internal server error');
      return;
    }

    if (!row) {
      res.status(401).send('Unauthorized');
      return;
    }

    db.run('DELETE FROM COMMENTS WHERE id = ?', [commentId], err => {
      if (err) {
        res.status(500).send('Internal server error');
        return;
      }

      res.json({ message: 'Comment deleted successfully' });
    });
  });
};
