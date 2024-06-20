// importação do modulo dotenv que gerencia o arquivo 
//.env e o configura para ser ultilizado
require("dotenv").config();
// importação do modulo mysql2 para acessar o banco 
//de dados mysql
const mysql = require("mysql2");
const con = mysql.createConnection({
    host:process.env.HOST_DATABASE,
    port:process.env.DATABASE_PORT,
    user:process.env.USER_NAME,
    password:process.env.PASSWORD,
    database:process.env.DATABASE_NAME
});
//Exportando a configuração do banco 
//fique disponivel para ser acessada por 
//outro arquivo.
module.exports = con;