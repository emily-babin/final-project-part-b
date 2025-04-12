const express = require('express');
const ItemController = require("./controllers/ItemController");
const CategoryController = require('./controllers/CategoryController');

const router = express.Router();

router.post('/items', ItemController.store); // Create
router.get('/items', ItemController.index); // Read
router.patch('/items/:id', ItemController.update); // Update
router.delete('/items/:id', ItemController.destroy); // Delete

router.post('/categories', CategoryController.store); // Create
router.get('/categories', CategoryController.index); // Read
router.patch('/categories/:id', CategoryController.update); // Update
router.delete('/categories/:id', CategoryController.destroy); // Delete

module.exports = router;