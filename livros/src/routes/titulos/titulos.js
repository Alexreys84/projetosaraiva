const express = require("express")
const route_titulo =express.Router();
const data = require("../../database/config.js")

route_titulo.get("listar",(req, res)=>{
    data.query("select * from titulo",(Error, result)=>{
        if(Error){
            return res.status(500).send({msg:"Erro ao carrecar os Titulos"})
        }
        res.status(200).send({msg:"OK",payload:result})
    })
})

route_titulo.get("/detalhes",(req,res)=>{
    data.query(`select t.idtitulo,
    t.nometitulo,
    t.autor,
    t.sinopse,
    t.datacadastro,
    p.precoatual,
    p.precodesconto,
    f.foto1,
    f.foto2,
    f.foto3,
    f.foto4
    
    from preco p INNER join titulo t
    on p.idpreco = t.idpreco inner join
    fotos f on t.idfoto = f.idfotos
    
    `,(Error,result)=>{
        if (Error){
            return res.status(500).send({msg:"Erro ao carregar os titulos" + Error})
        }
        res.status(200).send({msg:"OK",payload:result})
    })
})
route_titulo.post("/cadastrar",(req,res)=>{
       data.query("insert into titulo set ?",req.body,(Error,result)=>{
        if (Error){
        return res.status(500).send({msg:"Erro ao tentar cadastrar"})
        }
    res.status(201).send({msg:"OK",payload:result})

    })
})
module.exports = route_titulo