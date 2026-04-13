const db = require('../config/db');

// 🟢 GET all items (for logged-in user)
exports.getItems = async (req, res) => {
  try {
    const [items] = await db.query(
      'SELECT * FROM items WHERE user_id = ?',
      [req.user.id]
    );

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// 🟢 GET single item
exports.getItemById = async (req, res) => {
  try {
    const [item] = await db.query(
      'SELECT * FROM items WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );

    if (item.length === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(item[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// 🟢 CREATE item
exports.createItem = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    await db.query(
      'INSERT INTO items (user_id, title, description, status) VALUES (?, ?, ?, ?)',
      [req.user.id, title, description, status || 'active']
    );

    res.status(201).json({ message: 'Item created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// 🟢 UPDATE item
exports.updateItem = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    await db.query(
      'UPDATE items SET title=?, description=?, status=? WHERE id=? AND user_id=?',
      [title, description, status, req.params.id, req.user.id]
    );

    res.json({ message: 'Item updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// 🟢 DELETE item
exports.deleteItem = async (req, res) => {
  try {
    await db.query(
      'DELETE FROM items WHERE id=? AND user_id=?',
      [req.params.id, req.user.id]
    );

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};