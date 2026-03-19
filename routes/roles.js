const express = require("express");
const router = express.Router();

const roleController = require("../controller/roleController");

// CRUD
router.post("/", roleController.createRole);
router.get("/", roleController.getRoles);
router.get("/:id", roleController.getRoleById);
router.put("/:id", roleController.updateRole);
router.delete("/:id", roleController.deleteRole);

// lấy user theo role
router.get("/:id/users", roleController.getUsersByRole);

module.exports = router;