const express = require("express")
const route_foto =express.Router()
const data = require("../../database/config.js")

route_foto.post("/cadastrar",(req,res)=>{
    data.query("insert into fotos set ?",req.body,(Error, result)=>{
        if(Error){
            return res.status(500).send({msg:"Erro ao tentar cadastrar"})
        }
        res.status(201).send({msg:"OK",payload:result})
    })
})
module.exports = route_foto