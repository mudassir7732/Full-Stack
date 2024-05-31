const express = require('express');
const router = express.Router();
const db = require('../config/db');

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



router.post('/add-user', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const checkEmailSql = 'SELECT * FROM users WHERE email = ?';
    const checkResult = db.query(checkEmailSql, [email]);
    if (checkResult.length > 0) {
      return res.status(400).json({ message: 'Email Already Registered' });
    }
    //  const hashedPassword = await bcrypt.hash(password, 10);
    const insertSql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    db.query(insertSql, [name, email, password, role]);
    res.json({ message: 'Successfully Added', name, email, role });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
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
