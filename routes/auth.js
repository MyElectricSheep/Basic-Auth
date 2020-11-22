const express = require("express");
const authRouter = express.Router();
const authorizeUser = require('../middlewares/auth')
const jwt = require("jsonwebtoken");

authRouter.post("/login", async (req, res, next) => {
    const { username, password } = req.body
    // This is for demo purposes only; you would **NEVER** hardcode a username and a password
    // in the clear in your app
    const credentials = {
        username: "ben",
        password: "chicken"
    }
    if (credentials.username === username && credentials.password === password) {
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
    } else {
        res.status(401).send('Username or password mismatch')
    }

});

authRouter.get("/secret", authorizeUser, (req, res, next) => {
    res.send(req.data)
}) 

module.exports = authRouter;
