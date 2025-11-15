const express = require("express");
const router = express.Router();


const {
    createUser,
    getAllUser,
    getUserById,
    updateUser,
    deleteUser,
    getUserError
} = require("../controllers/userController");

//BASE PATH


router.post("/", createUser);
router.get("/", getAllUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/", getUserError);

module.exports = router;
