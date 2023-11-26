const express = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const { signUp, login, logout } = require('../controller/auth.controller')

const router = new express.Router()

router.post('/api/signup', signUp)
router.post('/api/login', login)
router.post('/api/logout', authMiddleware, logout)

module.exports = router