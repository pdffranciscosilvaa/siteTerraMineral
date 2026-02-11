const express = require('express')
const router = express.Router()

const { enviarRelatorio } = require('../controller/contato.controller')

const authMiddleware = require('../middleware/auth.middleware')

// POST /contato - Enviar relatório de contato
router.post(
    '/',
    authMiddleware,
    enviarRelatorio
)

module.exports = router