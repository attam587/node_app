const pool = require("../config/db");

// CREATE USER
exports.createUserService = async (name, age) => {
    const result = await pool.query(
        "INSERT INTO users (name, age) VALUES ($1, $2) RETURNING *",
        [name, age]
    );
    return result.rows[0];
};

// UPDATE USER
exports.updateUserService = async (id, name, age) => {
    const result = await pool.query(
        "UPDATE users SET name=$1, age=$2 WHERE id=$3 RETURNING *",
        [name, age, id]
    );
    return result.rows[0];
};

// DELETE USER
exports.deleteUserService = async (id) => {
    const result = await pool.query(
        "DELETE FROM users WHERE id=$1 RETURNING *",
        [id]
    );
    return result.rows[0];
};

// GET ALL USERS
exports.getAllUserService = async () => {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
};

// GET USER BY ID
exports.getUserByIdService = async (id) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE id=$1",
        [id]
    );
    return result.rows[0];
};
