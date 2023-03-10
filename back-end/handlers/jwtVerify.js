const jwt = require('jsonwebtoken');

exports.jwtVerify = (req, res, next) => {

  const proto = req.headers.authorization.split(" ")[0];
  const token = req.headers.authorization.split(" ")[1];
  console.log(proto);
  console.log(token);

  if (proto === 'Bearer') {
    jwt.verify(token, "ncufresh-secret", (err, decoded) => {
      if (err) {
        res.status(500).send("invalid token 1");
        return;
      } else {
        console.log(decoded);
        req.jwtDecoded = decoded;
      }
    });
  } else {
    res.status(500).send("Invalid Authorization");
    return;
  }
  next();
};
