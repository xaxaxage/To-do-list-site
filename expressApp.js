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

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'feedbacksdb',
    password: 'lol',
}) 

const execute = async (req) => {
    try {
        await client.connect()
        const res = await client.query(req)
        console.log(res)
        await client.end()
    } catch (error) {
        console.log(error)
    }
}

execute('SELECT * FROM feedbacks')

app.listen(5500)


