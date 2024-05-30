const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {
  try {
    //  const errors = validationResult(req);
    //  if (!errors.isEmpty()) {
    //    return res.status(400).json({ errors: errors.array() });
    //  }

    const { name, email, password } = req.body;
    let role = req.body.role || 'User';

    const checkEmailSql = 'SELECT * FROM users WHERE email = ?';
    const checkResult = connection.query(checkEmailSql, [email]);
    if (checkResult.length > 0) {
      return res.status(400).json({ message: 'Email Already Registered' });
    }

    const secretKey = 'mysecretkey123';

    //  const hashedPassword = await bcrypt.hash(password, 10);
    const access_token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });

    const insertSql = 'INSERT INTO users (name, email, password, role, access_token) VALUES (?, ?, ?, ?, ?)';
    connection.query(insertSql, [name, email, password, role, access_token]);

    //  Set access token as HTTP-only cookie
    //  res.cookie('access-token', token, {
    //    httpOnly: true,
    //    secure: true,  //Set to true if your app is served over HTTPS
    //    sameSite: 'strict',
    //  });

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

    res.json({ success: true, user: user, message: 'Sign-in Successful' });

  });
});

module.exports = router;
