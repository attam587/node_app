const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const pool = require("../config/db");

const {
    createUserService,
    updateUserService,
    deleteUserService,
    getAllUserService,
    getUserByIdService
} = require("../services/userServices");

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
        const user = await createUserService(name, age);
        res.status(200).json({
            status: true,
            message: "Added new user",
            user: user,
        });
    } catch (error) {
        next(error)
    }
};

// READ ALL

exports.getAllUser = async (req, res, next) => {
    try {
        const users = await getAllUserService();
        res.json({
            status: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        next(error)
    }
};

// Get user by Id

exports.getUserById = async (req, res, next) => {
    try {
        const user = await getUserByIdService(req.params.id);
        if (!user) {
            return next(new AppError("User not found", 404));
        }
        res.status(200).json({
            status: true,
            message: "user found successfully",
            data: user
        });
    } catch (error) {
        next(error)
    }
}


// Update User

exports.updateUser = async (req, res, next) => {
    try {
        const {name, age} = req.body;
        const user = await updateUserService(req.params.id, name, age);
        if (!user) {return next(new AppError("User not found", 404));}
        res.json({
            status: true,
            message: "Update successfully!",
            data: user
        });  
    } catch (error) {
        next(error)
    }
};

// Delete User

exports.deleteUser = async (req, res, next) => {
    try {
        const user = await deleteUserService(req.params.id);
        if (!user) {
            return next(new AppError("User not found", 404));
        }
        res.json({
            message: "User deleted",
            data: user
        })
    } catch (error) {
        next(error)
    }
};