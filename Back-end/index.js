require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const multer = require('multer');
const mysql = require("mysql");

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

const pool = mysql.createPool({
  connectionLimit: 10,
  database: process.env.DATABASE,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const secretKey = process.env.SECRET_KEY;



app.post('/shopify', (req, res)=>{
  const {} = req.body;
})


app.post('/register', (req, res) => {
  const { name, email, password, role } = req.body;
  const checkEmailSql = 'SELECT * FROM registeredusers WHERE email = ?';
  pool.query(checkEmailSql, [email], (checkErr, checkResult) => {
    if (checkErr) {
      console.error('Error checking email:', checkErr);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }

    if (checkResult.length > 0) {
      res.json({ message: 'Email Already Registered' });
      return;
    }

    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
    const insertSql = 'INSERT INTO registeredusers (name, email, password, role, token) VALUES (?, ?, ?, ?, ?)';
    pool.query(insertSql, [name, email, password, role, token], (insertErr, insertResult) => {
      if (insertErr) {
        console.error('Error registering user:', insertErr);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }
      res.json({ message: 'Successfully Registered', name, email, password, role, token });
    });
  });
});


app.put('/update/:userId', (req, res) => {
  const userId = req.params.userId;
  const { name, email, password, role } = req.body;

  const updateSql = 'UPDATE registeredusers SET name = ?, email = ?, password = ?, role = ? WHERE id = ?';
  pool.query(updateSql, [name, email, password, role, userId], (updateErr, updateResult) => {
    if (updateErr) {
      console.error('Error updating user:', updateErr);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }

    if (updateResult.affectedRows === 0) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ message: 'User updated successfully' });
  });
});


app.delete('/delete/:userId', (req, res) => {
  const userId = req.params.userId;

  const deleteSql = 'DELETE FROM registeredusers WHERE id = ?';
  pool.query(deleteSql, [userId], (deleteErr, deleteResult) => {
    if (deleteErr) {
      console.error('Error deleting user:', deleteErr);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }

    if (deleteResult.affectedRows === 0) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ message: 'User deleted successfully' });
  });
});



app.post("/signin", function (req, res) {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM registeredusers WHERE email = ?';
  pool.query(sql, [email], (err, result) => {
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

    res.json({ userExist: true, user: user, message: 'success' });
  });
});


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage }).single("user_file");

app.post("/upload-data", upload, (req, resp) => {
  const { filename, path: filePath } = req.file;
  const { name, description } = req.body;
  const status = "Pending";

  const supplierURLs = Object.keys(req.body)
    .filter((key) => key.startsWith("supplier_url_"))
    .map((key) => req.body[key]);

  const videoURLs = Object.keys(req.body)
    .filter((key) => key.startsWith("video_url_"))
    .map((key) => req.body[key]);

  const date = new Date().toLocaleString();
  const imageUrl = `${req.protocol}://${req.get('host')}/${filePath}`;
  const sql = 'INSERT INTO products (filename, imageURL, name, description, supplierURLs, videoURLs, status, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

  pool.query(sql, [filename, imageUrl, name, description, JSON.stringify(supplierURLs), JSON.stringify(videoURLs), status, date], (err, result) => {
    if (err) {
      console.error('Error storing image:', err);
      resp.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    resp.status(200).json({ message: 'Data stored successfully' });
  });
});


app.get("/get-data", (req, resp) => {
  const sql = 'SELECT * FROM products';

  pool.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching images:', err);
      resp.status(500).json({ message: 'Internal Server Error' });
    }
    return resp.json(result);
  });
});


app.get("/get-users", (req, resp) => {
  const sql = 'SELECT * FROM registeredusers';

  pool.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching images:', err);
      resp.status(500).json({ message: 'Internal Server Error' });
    }
    return resp.json(result);
  });
});


app.post("/update-product-status", (req, resp) => {
  const { id, newStatus } = req.body;
  const sql = 'UPDATE products SET status = ? WHERE id = ?';
  pool.query(sql, [newStatus, id], (err, result) => {
    if (err) {
      console.error('Error updating status:', err);
      resp.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    resp.status(200).json({ message: 'Status updated successfully' });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});