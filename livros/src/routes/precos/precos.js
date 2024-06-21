const express = require("express")
const route_preco = express.Router()
const data = require("../../database/config.js")

route_preco.post("/cadastrar",(req,res)=>{
    data.query("insert into preco set ?",req.body,(Error, result)=>{
      if(Error){
        return res.status(500).send({msg:"Erro ao tentar cadastrar "})    
      }
        res.status(201).send({msg:"OK",payload: result})
    })
})
module.exports = route_preco
