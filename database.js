const dotenv = require("dotenv")
const { Client } = require("pg")

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

// select("SELECT * FROM feedbacks").then(data => {
//     console.log(data)
//     client.end()
// })



module.exports = client
module.exports = select
module.exports = insertUser



