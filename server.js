var express = require('express')
var app = express()

app.use(express.static('dist'))

app.get('/', function (req, res) {
  res.render('index.html')
})

const PORT = process.env.PORT || 1337;

app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT + '!')
})