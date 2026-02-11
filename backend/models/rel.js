const Usuario = require('./Usuario')
const Pedido = require('./Pedido')
const Documento = require('./Documento')

/*
 RELACIONAMENTOS
*/

/**
 * USUÁRIO 1:N PEDIDOS
 * Um usuário pode ter vários pedidos
 * Um pedido pertence a um único usuário
 */

Usuario.hasMany(Pedido, {
    foreignKey: 'idUsuario',
    as: 'pedidos'
})

Pedido.belongsTo(Usuario, {
    foreignKey: 'idUsuario',
    as: 'usuario'
})

/**
 * PEDIDO 1:N DOCUMENTOS
 * Um pedido pode ter vários documentos
 * Um documento pertence a um único pedido
 */
Pedido.hasMany(Documento, {
    foreignKey: 'idPedido',
    as: 'documentos'
})

Documento.belongsTo(Pedido, {
    foreignKey: 'idPedido',
    as: 'pedido'
})

module.exports = {
    Usuario,
    Pedido,
    Documento
}
