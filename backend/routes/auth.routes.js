const express = require('express')
const router = express.Router()

const authController = require('../controller/auth.controller')

// Rota pública de login
router.post('/login', authController.login)

module.exports = router
