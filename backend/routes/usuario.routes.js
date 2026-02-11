const express = require('express')
const router = express.Router()

const usuarioController = require('../controller/usuario.controller')

// Rota pública para cadastro
router.post('/', usuarioController.cadastrar)

module.exports = router
