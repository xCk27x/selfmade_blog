const app = require('./index');

const port = process.env.PORT || 3000;

app.listen(port, '127.0.0.1', () => {
  console.log(`runing on port ${port}...`);
});