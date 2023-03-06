const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const morgan = require('morgan');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 3000;

// parse application/json requests
app.use(bodyParser.json());

app.use(morgan('dev'));

// initialize database connection
const db = new sqlite3.Database('./ncufresh-homework.db');

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