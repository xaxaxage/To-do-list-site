const dotenv = require("dotenv")
const { Client } = require("pg")
const express = require("express")
dotenv.config()

app = express()

app.set('view engine', 'ejs')

app.use('/public', express.static('public'))

app.get('/feedbacks', function(req, res) {
    res.render('feedbacks')
})

app.get('/to-do-list', function(req, res) {
    res.render('toDoList')
})

app.get('/succes-tasks', function(req, res) {
    res.render('succesList')
})

app.listen(5500)




