const dotenv = require("dotenv")
const { Client } = require("pg")
const express = require("express")
dotenv.config()

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'To do list database',
    password: 'lol',
}) 

const insertUser = async (data) => {
    try {
        await client.connect();           // gets connection
        await client.query(
            `INSERT INTO "feedbacks" ("username", "feedback")  
             VALUES ($1, $2)`, data); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        await client.end();               // closes connection
    }
};

const select = async (req) => {
    try {
        await client.connect()
        const res = await client.query(req)
        return res
        await client.end()
    } catch (error) {
        console.log(error)
    }
}


app = express()

app.use(express.json())

app.use(express.urlencoded())

app.set('view engine', 'ejs')

app.use('/public', express.static('public'))

app.get('/feedbacks', function(req, res) {
    res.sendFile(__dirname + '/views/feedbacks.html')
})

app.get('/to-do-list', function(req, res) {
    res.render('toDoList')
})

app.get('/succes-tasks', function(req, res) {
    res.render('succesList')
})

app.post('/formPost', (req, res) => {
    const data = req.body  
    
    insertUser([data.feedback, data.rating])
})

app.listen(5500)
