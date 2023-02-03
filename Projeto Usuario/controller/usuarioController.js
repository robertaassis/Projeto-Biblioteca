var express = require('express')
const bodyParser = require('body-parser')
const pool = require('../models/usuarioPool')
var app = express()

app.use(bodyParser.json())

// GET geral
app.get('/', (req, res) =>{
    pool.query('SELECT * FROM usuario ORDER BY id', (err, results) => {
        if (err) {
          throw err
        }
        // console.log(results.rows)
        res.type('json').send(JSON.stringify(results.rows, null, 2)+ '\n')
    })
})

// GET unica 
app.get('/:id', (req, res) =>{
    const id = req.params.id
    pool.query('SELECT * FROM usuario where id = $1', [id], (err, results) => {
        if (err) {
          throw err
        }
        // response.status(200).json(results.rows)
        res.type('json').send(JSON.stringify(results.rows, null, 2)+ '\n')
    })
})

// POST
app.post('/', (req, res)=>{
    const {nome, email, cpf, senha} = req.body
    pool.query('INSERT INTO usuario(nome, email, cpf, senha) VALUES ($1, $2, $3, $4) RETURNING *',
    [nome, email, cpf, senha], (err, results)=>{
        if(err) { throw err.message }
        res.send('Post de usuário realizado! Caso deseje ver os usuários, tentar método get')
    }) 
})

// UPDATE
app.put('/:id', (req, res)=>{
    const id = parseInt(req.params.id)
    const {nome, email, cpf, senha} = req.body
    pool.query('UPDATE usuario SET nome = $1, email= $2, cpf= $3, senha= $4 WHERE id= $5',
    [nome, email, cpf, senha, id], (err, results)=>{
        if(err) { throw err.message }
        res.send('Usuario alterado!')
    }) 
})

// DELETE
app.delete('/:id', (req, res)=>{
    const id = parseInt(req.params.id)
    pool.query('DELETE FROM usuario WHERE id = $1',
    [id], (err, results)=>{
        if(err) { throw err.message }
        res.send('Usuario excluido!')
    }) 
})

module.exports = app;