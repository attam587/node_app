const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const pool = require("../config/db");

let users = [
    {id: 1, name: "Atta", age: 35},
    {id: 2, name: "Usman", age: 30}
];

// get User & handle error Async

exports.getUserError = (req, res, next) => {
    throw new AppError("Database connection failed", 500);
    res.status(200).json({
        success: true,
        data: [],
    });
};


// Create

exports.createUser = async (req, res, next) => {
    try {
        const {name, age} = req.body;
        if (!name || !age) {
            return next(new AppError("Name and age are required!", 400));
        }
        const result = await pool.query(
            "INSERT INTO users (name, age) VALUES ($1, $2) RETURNING *",
            [name, age]
        );
        res.status(200).json({
            status: true,
            message: "Added new user",
            user: result.rows[0],
        });
    } catch (error) {
        next(error)
    }
};

// READ ALL

exports.getAllUser = async (req, res, next) => {
    try {
        const result = await pool.query (
            "SELECT * FROM USERS"
        );
        res.json({
            status: true,
            count: result.rows.length,
            data: result.rows
        });
    } catch (error) {
        next(error)
    }
};

// Get user by Id

exports.getUserById = async (req, res, next) => {
    try {
        const result = await pool.query ("SELECT * FROM USERS WHERE id = $1", [req.params.id]);
        if (result.rows.length === 0) {
            return next(new AppError("User not found", 404));
        }
        res.status(200).json({
            status: true,
            message: "user found successfully",
            data: result.rows[0]
        });
    } catch (error) {
        next(error)
    }
}


// Update User

exports.updateUser = async (req, res, next) => {
    try {
        const result = await pool.query ("SELECT * FROM USERS WHERE id = $1", [req.params.id]);
        if (result.rows.length === 0) {
            return next(new AppError("User not found", 404));
        }

        const {name, age} = req.body;
        const user = await pool.query (
            "UPDATE users SET name=$1, age=$2 WHERE id=$3 RETURNING *",
            [name, age, req.params.id]
        );
        res.status(200).json({
            status: true,
            message: "Update successfully!",
            data: user.rows[0]
        });  
    } catch (error) {
        next(error)
    }
};

// Delete User

exports.deleteUser = async (req, res, next) => {
    try {
        const result = await pool.query(
            "DELETE FROM users WHERE id = $1 RETURNING *",
            [req.params.id]
        );
        if (result.rows.length === 0 ) {
            return next(new AppError("User not found", 404));
        }
        res.json({
            message: "User deleted",
            data: result.rows[0]
        })

    } catch (error) {
        next(error)
    }
};