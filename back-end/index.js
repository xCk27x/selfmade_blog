const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const expressJwt = require('express-jwt');

const app = express();

// using middleware
app.use(session(
  {
    secret: 'session-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600 * 1000 },
  }
));

app.use(express.static(path.join(__dirname, 'static')));

app.use(cookieParser());

app.use(cors());

app.use(expressJwt.expressjwt({
  secret: "ncufresh-secret",
  algorithms: ['HS256']
}).unless({
  path: ["/api/user/register", "/api/user/login"],
}));

app.use(bodyParser.json());

app.use(morgan('dev'));

//  引入Router
const userRouter = require('./routes/userRoute');
const postRouter = require('./routes/postRoute');
const commentRouter = require('./routes/commentRoute');

// create USERS table
// db.run(`
//   CREATE TABLE IF NOT EXISTS USERS(
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     username TEXT NOT NULL UNIQUE,
//     password TEXT NOT NULL,
//     token TEXT
//   );
// `);

// // create POSTS table
// db.run(`
//   CREATE TABLE IF NOT EXISTS POSTS (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     title TEXT NOT NULL,
//     content TEXT NOT NULL,
//     author_id INTEGER NOT NULL
//   );
// `);

// // create COMMENTS table
// db.run(`
//   CREATE TABLE IF NOT EXISTS COMMENTS (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     author_id INTEGER NOT NULL ,
//     post_id INTEGER NOT NULL,
//     content TEXT NOT NULL
//   );
// `);

app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
app.use('/api/comment', commentRouter);

module.exports = app;