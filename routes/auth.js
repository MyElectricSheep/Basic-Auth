const express = require("express");
const authRouter = express.Router();
const authorizeUser = require('../middlewares/auth')
const jwt = require("jsonwebtoken");

authRouter.get("/login", async (req, res, next) => {
    try {
        const token = await jwt.sign(
            {
              id: 1,
              data: "somethingNotSecret",
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          res.set('x-authorization-token', token).send('Login successful!')
    } catch (e) {
        res.status(500).send(e.message)
    }

});

authRouter.get("/secret", authorizeUser, (req, res, next) => {
    res.send(req.data)
}) 

module.exports = authRouter;
