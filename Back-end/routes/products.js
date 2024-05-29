const express = require('express');
const multer = require('multer');
const router = express.Router();
const db = require('../config/db');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage }).single("user_file");

router.post("/upload-data", upload, (req, res) => {
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

  db.query(sql, [filename, imageUrl, name, description, JSON.stringify(supplierURLs), JSON.stringify(videoURLs), status, date], (err) => {
    if (err) {
      console.error('Error storing image:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.status(200).json({ message: 'Data stored successfully' });
  });
});

router.get("/get-data", (req, res) => {
  const sql = 'SELECT * FROM products';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.json(result);
  });
});

router.post("/update-product-status", (req, res) => {
  const { id, newStatus } = req.body;
  const sql = 'UPDATE products SET status = ? WHERE id = ?';

  db.query(sql, [newStatus, id], (err) => {
    if (err) {
      console.error('Error updating status:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.status(200).json({ message: 'Status updated successfully' });
  });
});

module.exports = router;
