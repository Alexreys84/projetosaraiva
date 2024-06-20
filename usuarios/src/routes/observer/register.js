const data = require("../../database/config.js")
function insert_resister(idusuario,dh_acesso,tentativa_login,pag_acessada,observacao){
    console.log(idusuario,dh_acesso,tentativa_login,pag_acessada,observacao)
    data.query(`insert into observadoracesso set idusuario=?,acesso=?,tentativalogin=?,paginaacessada=?,observacao=?`,
    [idusuario,dh_acesso,tentativa_login,pag_acessada,observacao],
    (Error,result)=>{
        if(Error){
            return "Erro a tentar inserir a observação"
        }
        return result;
    })
}
module.exports = insert_resister