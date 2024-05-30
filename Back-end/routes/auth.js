const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const createToken = (email, role) => {
  const token = jwt.sign({ email, role }, SECRET_KEY, { expiresIn: '1h' });
  return token;
};

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // let role = req.body.role || 'User';
    let role = 'User';

    const checkEmailSql = 'SELECT * FROM users WHERE email = ?';
    const checkResult = connection.query(checkEmailSql, [email]);
    if (checkResult.length > 0) {
      return res.status(400).json({ message: 'Email Already Registered' });
    }
    //  const hashedPassword = await bcrypt.hash(password, 10);
    // const access_token = jwt.sign({ email, role}, process.env.SECRET_KEY, { expiresIn: '1h' });
    const access_token = createToken(email, role);
    const insertSql = 'INSERT INTO users (name, email, password, role, access_token) VALUES (?, ?, ?, ?, ?)';
    connection.query(insertSql, [name, email, password, role, access_token]);
    res.json({ message: 'Successfully Registered', name, email, role, access_token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post("/signin", function (req, res) {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  connection.query(sql, [email], (err, result) => {
    if (err) {
      console.error('Error signing in:', err);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    if (!result || result.length === 0) {
      res.json({ userExist: false, message: 'Email not registered' });
      return;
    }

    const user = result[0];

    if (user.password !== password) {
      res.json({ userExist: true, message: 'Password Incorrect' });
      return;
    }

    const role = user.role;
    const access_token = createToken(email, role);
    res.json({ message:'Sign-in Successful', access_token, email, role});
  });
});


module.exports = router;
