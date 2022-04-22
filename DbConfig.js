const mysql = require("mysql");
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "codebreed",
  password: "test1234",
  database: "etfdemo",
});

module.exports = pool;

// import mysql from "serverless-mysql";

// export const db = mysql({
//   config: {
//     host: process.env.ENDPOINT,
//     database: process.env.DATABASE,
//     user: process.env.USERNAME,
//     password: process.env.PASSWORD,
//   },
// });

// export async function sql_query(query_string, values = []) {
//   try {
//     const result = await db.query(query_string, values);
//     await db.end();
//     return result;
//   } catch (error) {
//     throw Error(error.message);
//   }
// }

// const mysql = require("serverless-mysql")({
//   config: {
//     host: "localhost",
//     database: "etfdemo",
//     user: "codebreed",
//     password: "test1234",
//   },
// });

// export default mysql;
