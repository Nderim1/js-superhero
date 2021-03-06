const express = require('express')
const app = express()

app.use(express.static('public'))

app.get('*', function (req, res) {
	app.use(express.static(__dirname + '/public'))
})

app.listen(3000, function () {
	console.log('Example app listening on port 3000!')
})