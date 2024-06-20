require("dotenv").config()
const jwt = require("jsonwebtoken")
const verificar = (req, res, next) => {
    // criar uma constate para guardar o token 
    // que o usuário irá enviar, no cabeçalho de 
    // requisição
    const token_enviado = req.headers.token
    if (!token_enviado) {
        return res.status(401).send({ msg: "Não autenticado. Efetue o login" })

    }
    jwt.verify(token_enviado,process.env.JWt_KEY, (Error,result)=>{
        if(Error){
            return res.status(403).send({msg:"Você não tem autorização para acessar este conteúdo."})

        }
        next()
    })
}
module.exports = verificar