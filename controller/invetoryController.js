const Inventory = require("../schemas/invetory");

class InventoryController {

    // ✅ get all + join product
    async getAllInventory(req, res) {
        try {
            const data = await Inventory.find().populate('product');
            res.json(data);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async getInventoryById(req, res) {
        try {
            const data = await Inventory.findById(req.params.id).populate('product');

            if (!data) {
                return res.status(404).json({ message: "Not found" });
            }

            res.json(data);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    
    async addStock(req, res) {
        try {
            const { product, quantity } = req.body;

            const data = await Inventory.findOneAndUpdate(
                { product },
                { $inc: { stock: quantity } },
                { new: true }
            );

            if (!data) {
                return res.status(404).json({ message: "Inventory not found" });
            }

            res.json(data);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    
    async removeStock(req, res) {
        try {
            const { product, quantity } = req.body;

            const data = await Inventory.findOneAndUpdate(
                {
                    product,
                    stock: { $gte: quantity }
                },
                {
                    $inc: { stock: -quantity }
                },
                { new: true }
            );

            if (!data) {
                return res.status(400).json({ message: "Not enough stock" });
            }

            res.json(data);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    
    async reservation(req, res) {
        try {
            const { product, quantity } = req.body;

            const data = await Inventory.findOneAndUpdate(
                {
                    product,
                    stock: { $gte: quantity }
                },
                {
                    $inc: {
                        stock: -quantity,
                        reserved: quantity
                    }
                },
                { new: true }
            );

            if (!data) {
                return res.status(400).json({ message: "Not enough stock" });
            }

            res.json(data);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    
    async sold(req, res) {
        try {
            const { product, quantity } = req.body;

            const data = await Inventory.findOneAndUpdate(
                {
                    product,
                    reserved: { $gte: quantity }
                },
                {
                    $inc: {
                        reserved: -quantity,
                        soldCount: quantity
                    }
                },
                { new: true }
            );

            if (!data) {
                return res.status(400).json({ message: "Not enough reserved" });
            }

            res.json(data);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}

module.exports = new InventoryController();