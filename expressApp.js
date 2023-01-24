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

async function conn() {
    await client.connect(); 
    console.log('here')
}

conn()

const insertUser = async (data, table, columns, columnsQ = '$1, $2') => {
    try {          // gets connection
        await client.query(
            `INSERT INTO ${table} ${columns} 
             VALUES (${columnsQ})`, data); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } //finally {
        //await client.end();               // closes connection
    //}
};

const deleteRow = async (date, username) => {
    try {          // gets connection
        await client.query(
            'DELETE FROM "feedbacks" WHERE "date" = $1 AND "username" = $2', [date, username]); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }    
}

const select = async (req) => {
    try {
        const res = await client.query(req)
        return res
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
    select('SELECT * FROM feedbacks').then(data => {
        let rows = ''

        for (let i = 0; i < data.rows.length; i++) {
            rows = rows + JSON.stringify(data.rows[i])
        }   

        res.render('feedbacks', {arr: rows})
    })    
})

app.get('/to-do-list', function(req, res) {
    res.render('toDoList')
})

app.get('/succes-tasks', function(req, res) {
    res.render('succesList')
})

app.get('/sign-up', async (req, res) => {
    select('SELECT username FROM users').then(data => {
        const arr = []

        const rows = data.rows

        for (let i of rows) arr.push(i.username)
    
        res.render('signup', {arr: arr})
    })
})

// app.get('/login', (req, res) => {
//     res.sendFile(__dirname + '/views/login.html')
// })

app.post('/formPost', (req, res) => {

    // Adding data to database

    const data = req.body 
    
    if (data.password) {
        insertUser([data.username, data.password], 'users', "(username, password)")
    } 

    else if (data.rating) {
        insertUser([data.username, data.feedback, data.rating, data.date], 'feedbacks', "(username, feedback, rating, date)", '$1, $2, $3, $4')
    }
    
    else if (data.date) {
        deleteRow(data.date, data.username)
    }
})

app.listen(5500)
