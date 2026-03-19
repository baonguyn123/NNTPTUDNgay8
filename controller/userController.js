const User = require("../schemas/user");
const Role = require("../schemas/role");

class UserController {
    async createUser(req, res) {
        try {
            const user = new User(req.body);
            await user.save();
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getUserById(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async updateUser(req, res) {
        try {
            const user = await User
                .findByIdAndUpdate(
                    req.params.id, req.body, { new: true });
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async deleteUser(req, res) {
        try {
            const user = await User.delete(req.params.id);
            if (user) {
                res.json({ message: "User deleted" });
            } else {
                res.status(404).json({ message: "User not found" });
            }

        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async enableUser(req, res) {
        const { email, username } = req.body;

        const user = await User.findOne({
            email,
            username
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.status = true;

        
        await user.save();

        res.json(user);
    }
    async disableUser(req, res) {

        const { email, username } = req.body;

        const user = await User.findOne({
            email,
            username
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.status = false;

        await user.save();

        res.json(user);
    }

}
module.exports = new UserController()