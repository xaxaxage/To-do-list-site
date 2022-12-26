const dotenv = require("dotenv")
const { Client } = require("pg")
dotenv.config()


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

execute("SELECT * FROM feedbacks")
