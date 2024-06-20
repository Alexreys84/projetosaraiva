require("dotenv").config()
const express = require("express")
const router_personal = express.router()
const data= require("../../database/config.js")

router_personal.get("/listar",(req,res)=>{
    data.query("select * from dadospessoais",(Error,result)=>{
        if(Error){
            return res.status(500).send({msg:"Erro ao carregar os dados"})
        }
        res.status(200).send({msg:"OK",payload:result})
    })
})

router_personal.get("/listar/:cpf",(req,res)=>{
    data.query("select * from dadospessoais where iddadospessoais=?",req.params.cpf,(Error,result)=>{
        if(Error){
            return res.status(500).send({msg:"Erro ao carregar os dados"})
        }
        res.status(200).send({msg:"OK",payload:result})
    })
})
router_personal.post("/cadastar",(req,res)=>{
    data.query("insert into dadospessoais set ?",req.body,(Error,result)=>{
        if(Error){
            return res.status(500).send({msg:"Erro ao tentar cadastrar"})
        }
        res.status(201).send({msg:"OK",payload:result})
    })
})