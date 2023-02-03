var express = require('express')
var app = express()

const itens = require('./controller/itemController')
app.use('/item', itens)

app.listen(8001, function () {
  console.log('Listening on port 8001!')
})
