const Role = require('../schemas/role')
const User = require("../schemas/user");
class RoleController {
    async createRole(req, res) {
        try {
            const role = new Role(req.body);
            await role.save();
            res.status(201).json(role);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async getRoles(req, res) {
        try {
            const roles = await Role.find();
            res.json(roles);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getRoleById(req, res) {
        try {
            const role = await Role.findById(req.params.id);
            if (role) {
                res.json(role);
            } else {
                res.status(404).json({ message: "Role not found" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async updateRole(req, res) {
        try {
            const role = await Role.findByIdAndUpdate(
                req.params.id
                , req.body
                , { new: true });
            if (role) {
                res.json(role);
            } else {
                res.status(404).json({ message: "Role not found" });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async deleteRole(req, res) {
        try {
            const role = await Role.delete({ _id: req.params.id });

            if (role) {
                res.json({ message: "Role soft deleted" });
            } else {
                res.status(404).json({ message: "Role not found" });
            }

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getUsersByRole(req, res) {
        try {
            const roleId = req.params.id;
            const users = await User.find({
                role: roleId,
                deleted: false
            }).populate("role");
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
module.exports = new RoleController();