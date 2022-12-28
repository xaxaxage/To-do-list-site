// const dotenv = require("dotenv")
// const { Client } = require("pg")

// dotenv.config()

// const client = new Client({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'To do list database',
//     password: 'lol',
// }) 

// const insertUser = async (userName) => {
//     try {
//         await client.connect();           // gets connection
//         await client.query(
//             `INSERT INTO "users" ("name")  
//              VALUES ($1)`, [userName]); // sends queries
//         return true;
//     } catch (error) {
//         console.error(error.stack);
//         return false;
//     } finally {
//         await client.end();               // closes connection
//     }
// };


// const select = async (req) => {
//     try {
//         await client.connect()
//         const res = await client.query(req)
//         console.log(res)
//         await client.end()
//     } catch (error) {
//         console.log(error)
//     }
// }

// select('SELECT * FROM feedbacks')

