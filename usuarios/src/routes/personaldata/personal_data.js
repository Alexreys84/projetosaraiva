require("dotenv").config()
const express = require("express")
const router_personal = express.Router()
const data= require("../../database/config.js")
const verifica = require("../../middleware/verify_token.js")

router_personal.get("/listar",verifica,(req,res)=>{
    data.query("select * from dadospessoais",(Error,result)=>{
        if(Error){
            return res.status(500).send({msg:"Erro ao carregar os dados"})
        }
        res.status(200).send({msg:"OK",payload:result})
    })
})

router_personal.get("/listar/:cpf",verifica,(req,res)=>{
    data.query("select * from dadospessoais where iddadospessoais=?",req.params.cpf,(Error,result)=>{
        if(Error){
            return res.status(500).send({msg:"Erro ao carregar os dados"})
        }
        res.status(200).send({msg:"OK",payload:result})
    })
})
router_personal.post("/cadastrar",verifica,(req,res)=>{
    data.query("insert into dadospessoais set ?",req.body,(Error,result)=>{
        if(Error){
            return res.status(500).send({msg:"Erro ao tentar cadastrar"})
        }
        res.status(201).send({msg:"OK",payload:result})
    })
})
router_personal.put("/atualizar/:id",verifica,(req, res)=> {
    data.query("update dadospessoais set ? where iddadospessoais=?",[req.body,req.params.id],(Error, result)=>{
        if (Error){
            return res.status(500).send({msg:"Erro ao tentar atualizar os dados"})
        }
        res.status(200).send({msg:"OK",payload:result})
        })
})
module.exports = router_personal;
