const express = require('express');
const router = express.Router();
const controller = require('../controller/invetoryController');

router.get('/', controller.getAllInventory);
router.get('/:id', controller.getInventoryById);

router.post('/add-stock', controller.addStock);
router.post('/remove-stock', controller.removeStock);
router.post('/reservation', controller.reservation);
router.post('/sold', controller.sold);

module.exports = router;