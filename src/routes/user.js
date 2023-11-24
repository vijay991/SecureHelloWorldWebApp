const express = require('express')
const auth = require('../middleware/auth.middleware')
const { signUp, login, logout } = require('../controller/auth.controller')

const router = new express.Router()

router.post('/api/register', signUp)

router.post('/api/user/login', login)

router.post('/api/user/logout', auth, logout)

module.exports = router