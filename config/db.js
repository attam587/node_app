const { Pool } = require("pg");

const pool = new Pool ({
    user: "attakhan",
    host: "localhost",
    database: "node_app",
    password: "password123",
    port: 5432,
});

pool.connect()
    .then(() => console.log("PostgreSQL Connected Successfully"))
    .catch((err) => console.error("DB Connection Error:", err));

module.exports = pool;
