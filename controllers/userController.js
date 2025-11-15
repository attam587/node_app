const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

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

exports.createUser = (req, res, next) => {
    const {name, age} = req.body;
    if (!name || !age) {
        return next(new AppError("Name and age are required!", 400));
    }
    const newUser = {
        id: users.length + 1,
        name: name,
        age: age
    }
    users.push(newUser);
    res.status(200).json({
        status: true,
        message: "Added new user",
        user: newUser,
    });
};

// READ ALL

exports.getAllUser = (req, res) => {
    res.status(200).json({
        status: true,
        count: users.length,
        users
    });
};

// Get user by Id

exports.getUserById = (req, res, next) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if(!user) {
        return next(new AppError("User not found", 404));
    }

    res.status(200).json({
        status: true,
        message: "user found successfully",
        user
    }); 
}


// Update User

exports.updateUser = (req, res, next) => {
    const user = users.find(u => u.id === parseInt(req.params.id))
    if(!user) {
        return next(new AppError("User not found", 404));
    }
    user.name = req.body.name || user.name
    user.age = req.body.age || user.age

    res.status(200).json({
        status: true,
        message: "Update successfully!",
        user
    });
};

// Delete User

exports.deleteUser = (req, res, next) => {
    const index  = users.findIndex(u => u.id === parseInt(req.params.id))
    if (index === -1) {
        return next(new AppError("User not found", 404));
    }
    const deleteUser = users.splice(index, 1);
      res.json({
        message: "User deleted",
        deleted: deleteUser
  });
};