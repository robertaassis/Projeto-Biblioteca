var express = require('express')
const bodyParser = require('body-parser')
const pool = require('../models/itemPool')
var app = express()

app.use(bodyParser.json())

// GET geral
app.get('/', (req, res) =>{
    pool.query('SELECT * FROM item ORDER BY id', (err, results) => {
        if (err) {
          throw err
        }
        //console.log(results.rows)
        res.type('json').send(JSON.stringify(results.rows, null, 2)+ '\n')
    })
})

// GET unico
app.get('/:id', (req, res) =>{
    const id = req.params.id
    pool.query('SELECT * FROM item where id = $1', [id], (err, results) => {
        if (err) {
          throw err
        }
        // response.status(200).json(results.rows)
        res.type('json').send(JSON.stringify(results.rows, null, 2)+ '\n')
    })
})

// POST
app.post('/', (req, res)=>{
    console.log(req.body)
    const {autor, ano_lancamento, titulo} = req.body
    pool.query('INSERT INTO item(autor, ano_lancamento, titulo) VALUES ($1, $2, $3) RETURNING *',
    [autor, ano_lancamento, titulo], (err, results)=>{
        if(err) { throw err.message }
        res.send('Post de item realizado! Caso deseje ver o objeto, tentar método get')
    })
   
})

// UPDATE
app.put('/:id', (req, res)=>{
    const id = parseInt(req.params.id)
    const {autor, ano_lancamento, titulo} = req.body
    pool.query('UPDATE item SET autor = $1, ano_lancamento= $2, titulo= $3 WHERE id= $4',
    [autor, ano_lancamento, titulo, id], (err, results)=>{
        if(err) { throw err.message }
        res.send('Item alterado!')
    }) 
})

// DELETE
app.delete('/:id', (req, res)=>{
    const id = parseInt(req.params.id)
    pool.query('DELETE FROM item WHERE id = $1',
    [id], (err, results)=>{
        if(err) { throw err.message }
        res.send('Item excluido!')
    }) 
})

module.exports = app;