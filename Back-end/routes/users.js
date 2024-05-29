const express = require('express');
const router = express.Router();
const db = require('../config/db');
const verifyToken = require('../middlewares/auth');

router.get("/get-users", (req, res) => {
  const sql = 'SELECT * FROM users';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.json(result);
  });
});

router.put('/update/:userId', (req, res) => {
  const userId = req.params.userId;
  const { name, email, password, role } = req.body;

  const updateSql = 'UPDATE users SET name = ?, email = ?, password = ?, role = ? WHERE id = ?';
  db.query(updateSql, [name, email, password, role, userId], (updateErr) => {
    if (updateErr) {
      console.error('Error updating user:', updateErr);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.json({ message: 'User Updated Successfully' });
  });
});

router.delete('/delete/:userId', (req, res) => {
  const userId = req.params.userId;

  const deleteSql = 'DELETE FROM users WHERE id = ?';
  db.query(deleteSql, [userId], (err) => {
    if (err) {
      console.error('Error deleting user:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.json({ message: 'User Deleted Successfully' });
  });
});

module.exports = router;
