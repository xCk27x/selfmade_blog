// 因為app會用到process.env中的環境變數，所以要在app前去執行
const dotenv = require('dotenv');

const app = require('./index');

dotenv.config({ path: './config.env' });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});