const express = require("express");
const authRouter = express.Router();
const { authorizeUser, userContext } = require('../middlewares/auth')
const jwt = require("jsonwebtoken");
const mockUsers = require('./mockUsers');

authRouter.post("/login", async (req, res) => {
    const { username, password } = req.body

    const targetUser = mockUsers.find(user => user.username === username)
    console.log({targetUser})
    if (!targetUser) return res.status(404).send('Erroneous connection credentials')

    if (targetUser.username === username && targetUser.password === password) {
        try {
            const token = await jwt.sign(
                {
                  id: targetUser.id,
                  username: targetUser.username,
                  admin: targetUser.admin
                },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
              );
              res.set('x-authorization-token', token).send('Login successful!')
        } catch (e) {
            res.status(500).send(e.message)
        }
    } else {
        console.log('here')
        res.status(401).send('Username or password mismatch')
    }

});

authRouter.get("/secret", authorizeUser, (req, res) => {
    res.send(req.data)
}) 

authRouter.get('/me', [authorizeUser, userContext], (req, res) => {
    res.send(req.user)
})

module.exports = authRouter;
