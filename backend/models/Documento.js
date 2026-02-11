const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Documento = db.define('documento', {
    codDocumento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    idPedido: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'pedidos',
            key: 'codPedido'
        }
    },

    nome: {
        type: DataTypes.STRING(150),
        allowNull: false
    },

    tipo: {
        type: DataTypes.ENUM(
            'CONTRATO',
            'NOTA_FISCAL',
            'COMPROVANTE',
            'LAUDO',
            'OUTRO'
        ),
        allowNull: false
    },

    caminhoArquivo: {
        type: DataTypes.STRING,
        allowNull: false
    },

    status: {
        type: DataTypes.ENUM('ATIVO', 'INATIVO'),
        allowNull: false,
        defaultValue: 'ATIVO'
    },

    dataDocumento: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }

}, {
    timestamps: true,
    tableName: 'documentos'
})

module.exports = Documento
