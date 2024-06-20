require("dotenv").config()
const express = require("express")
const router = express.Router()
const data = require("../../database/config")
const bcrypt = require("bcrypt")
const round = Number(process.env.SALT)
const jtw = require("jsonwebtoken")
const verificar = require("../../middleware/verify_token")
const morgan = require("morgan")
const insert_resister = require("../observer/register.js")


router.use(morgan("combined"))
let remote_data = morgan("combined")

let tmp = new Date()
let date_time = `${tmp.getFullYear()}-${tmp.getMonth()+1}-${tmp.getDate()} ${tmp.getHours()}:${tmp.getMinutes()}:${tmp.getSeconds()}`
let idusuario =""


router.get("/listar", (req, res) => {
    insert_resister(idusuario,date_time,1,"/listar",remote_data.toString())
    data.query("select * from usuario", (error, dados) => {
        if (error) {
            return res.status(500).send({ msg: "Erro ao selecionar os dados" })
        }
        res.status(200).send({ msg: "OK", payload: dados })
    })
})
router.post("/cadastrar", (req, res) => {
    let sh = req.body.senha
    bcrypt.hash(sh, round, (error, crypt) => {
        if (error) {
            return res.status(500).send({ msg: "Erro ao tentar cadastar" })
        }
        req.body.senha = crypt
        data.query("insert into usuario set ?", req.body, (error, result) => {
            if (error) {
                return res.status(500).send({ msg: "Erro ao tentar cadastrar" })
            }
            res.status(201).send({ msg: "ok", payload: result })
        })
    })

})

router.put("/alterarfoto/:id",verificar, (req, res) => {
    data.query("update usuario set ? where idusuario=?", [req.body, req.params.id], (error, result) => {
        insert_resister(result[0].idusuario,date_time,1,`/alterarfoto/${req.params.id}`,remote_data.toString())
        if (error) {
            return res.status(500).send({ msg: "Erro ao tentar Atualizar a foto" + error })
        }
        res.status(200).send({ msg: "ok", payload: result })
    })

})
router.put("/alterarsenha/:id", (req, res) => {
    insert_resister(result[0].idusuario,date_time,1,`/alterarsenha/${req.params.id}`,remote_data.toString())
    let sh = req.body.senha
    bcrypt.hash(sh, round, (error, crypt) => {
        if (error) {
            return res.status(500).send({ msg: "Erro ao tentarAtualizar a senha" + error })
        }
        req.body.senha = crypt
        data.query("update usuario set ? where idusuario", [req.body, req.params.id], (error, result) => {
            if (error) {
                return res.status(500).send({ msg: "Erro ao tentar cadastrar" })
            }
            res.status(200).send({ msg: "ok", payload: result })
        })
    })

})
router.get("/buscarporid/:id", (req, res) => {
    data.query("select*from usuario where idusuario=?", req.params.id, (error, dados) => {
        insert_resister(result[0].idusuario,date_time,1,`/buscarporid/${req.params.id}`,remote_data.toString())
        if (error) {
            return res.status(500).send({ msg: "Erro ao selecionar os dados" })
        }
        res.status(200).send({ msg: "OK", payload: dados })
    })

})
router.get("/buscarporusuario/:usuario", (req, res) => {
    data.query("select*from usuario where nomeusuario=?", req.params.usuariio, (error, dados) => {
        insert_resister(result[0].idusuario,date_time,1,`/buscarporusuario/${req.params.id}`,remote_data.toString())
        if (error) {
            return res.status(500).send({ msg: "Erro ao selecionar os dados" })
        }
        res.status(200).send({ msg: "OK", payload: dados })
    })

})
router.post("/login", (req, res) => {
    let sh = req.body.senha
    data.query("select * from usuario where nomeusuario=?", req.body.nomeusuario, (error, result) => {
        if (error || result[0]==null) {
            insert_resister(0,date_time,1,"/login",remote_data.toString())
            return res.status(400).send({ msg: "Usuário ou Senha Incorreto" })
        }


        bcrypt.compare(sh, result[0].senha, (err, same) => {
            if (err) {
                return res.status(500).send({ msg: "Erro ao processar o login" + err })
            }
            else if (!same) {
                return res.status(400).send({ msg: "Usuário ou senha incorreta" })
            }
            else {
                insert_resister(result[0].idusuario,date_time,1,"/login",remote_data.toString())
                idusuario = result[0].idusuario
                let token =jtw.sign({idusuario:result[0].idusuario,nomeusuario:result[0].nomeusuario},
                    process.env.JWT_KEY,{expiresIn:"2d"}
                    )
               
               
               
                res.status(200).send({ msg: "Seja Bem Vindo", token:token })
            }
        })
    })

})

module.exports = router