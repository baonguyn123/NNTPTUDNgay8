const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");

// CRUD
router.post("/", userController.createUser);          // create user
router.get("/", userController.getUsers);             // get all users
router.get("/:id", userController.getUserById);       // get user by id
router.put("/:id", userController.updateUser);        // update user
router.delete("/:id", userController.deleteUser);     // soft delete

// enable / disable
router.post("/enable", userController.enableUser);
router.post("/disable", userController.disableUser);

module.exports = router;