var express = require('express')
var app = express()

const usuarios = require('./controller/usuarioController')
app.use('/usuario', usuarios)

app.listen(8002, function () {
  console.log('Listening on port 8002!')
})
