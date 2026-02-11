// Manually set environment variables from .env content
process.env.DB_NAME = 'db_ecom';
process.env.DB_USER = 'root';
process.env.DB_PASS = 'Arvore!';
process.env.DB_HOST = 'localhost';
process.env.DB_PORT = '3306';

process.env.JWT_SECRET = 'minha_chave_super_secreta_do_sistema';
process.env.JWT_EXPIRES_IN = '3h';

const app = require('./server/app')
const conn = require('./db/conn')

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || '0.0.0.0'

const isProduction = process.env.NODE_ENV === 'production'

async function startServer() {
  try {
    if (!isProduction) {
      await conn.sync({ alter: true })
      console.log('Banco sincronizado (dev) com { alter: true }');
    } else {
      // Em produção, primeiro tenta autenticar
      await conn.authenticate()
      console.log('Banco autenticado (produção)')
      
      // Depois verifica se as tabelas existem, se não, cria elas
      try {
        const [results] = await conn.query('SHOW TABLES')
        if (results.length === 0) {
          console.log('Nenhuma tabela encontrada. Criando tabelas...')
          await conn.sync({ alter: true })
          console.log('Tabelas criadas automaticamente!')
        }
      } catch (checkError) {
        console.log('Verificando tabelas...', checkError.message)
      }
    }
    
    // Global error handler for unhandled promise rejections and uncaught exceptions
    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason);
      // Application specific logging, throwing an error, or other logic here
      // Attempt to restart the server if it crashes due to an unhandled rejection
      startServer().catch(err => {
        console.error('Failed to restart server after unhandled rejection:', err);
        process.exit(1);
      });
    });
    
    process.on('uncaughtException', (err) => {
      console.error('Uncaught Exception:', err);
      // Application specific logging, throwing an error, or other logic here
      // Attempt to restart the server if it crashes due to an uncaught exception
      startServer().catch(err => {
        console.error('Failed to restart server after uncaught exception:', err);
        process.exit(1);
      });
    });

    app.listen(PORT, HOST, () => {
      console.log(`Servidor rodando em http://${HOST}:${PORT}`)
    })
  } catch (err) {
    console.error('Erro ao conectar ao banco ou iniciar o servidor:', err)
    process.exit(1)
  }
}

startServer()
