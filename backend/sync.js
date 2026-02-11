process.env.DB_NAME = 'db_ecom';
process.env.DB_USER = 'root';
process.env.DB_PASS = 'Arvore!';
process.env.DB_HOST = 'localhost';
process.env.DB_PORT = '3306';

const conn = require('./db/conn')

// Manually set environment variables from .env content
process.env.DB_NAME = 'db_ecom';
process.env.DB_USER = 'root';
process.env.DB_PASS = 'Arvore!';
process.env.DB_HOST = 'localhost';
process.env.DB_PORT = '3306';

const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '.env')})

const {
    Usuario,
    Pedido,
    Documento
} = require('./models/rel')

async function syncDataBase(){
    try{
        await conn.sync({force: true})

        console.log('----------------------------')
        console.log('Banco de Dados Sincronizado!')
        console.log('----------------------------')
    }catch(err){
        console.error('ERRO: Não foi possível sincronizar o Banco de Dados!',err)
    }finally{
        await conn.close()
        console.log('Conexão com o Banco de Dados encerrada.')
    }
}

syncDataBase()