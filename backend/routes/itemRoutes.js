const express = require('express');
const router = express.Router();

const {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
} = require('../controllers/itemController');

const authMiddleware = require('../middleware/auth');

// 🔒 All routes protected
router.get('/', authMiddleware, getItems);
router.get('/:id', authMiddleware, getItemById);
router.post('/', authMiddleware, createItem);
router.put('/:id', authMiddleware, updateItem);
router.delete('/:id', authMiddleware, deleteItem);

module.exports = router;