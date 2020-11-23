const jwt = require("jsonwebtoken");
const mockUsers = require('../routes/mockUsers')

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

const userContext = (req, res, next) => {
    const user = mockUsers.find(user => user.id === req.data.id)
    if (!user) return res.status(404).send('No such user')
    const { password, ...userWithoutPassword } = user
    req.user = userWithoutPassword
    next()
}

module.exports = {
    authorizeUser,
    userContext
};
