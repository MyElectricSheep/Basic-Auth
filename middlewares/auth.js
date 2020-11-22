const jwt = require("jsonwebtoken");

const authorizeUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).send("Access denied");
  try {
    req.data = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (e) {
    return res.status(403).send("Invalid token");
  }
};

module.exports = authorizeUser;
