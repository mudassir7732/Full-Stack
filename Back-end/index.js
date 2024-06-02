require('dotenv').config();
const app = require('./server');
const authRoutes = require('./routes/auth');
const productRoute = require('./routes/products')
const userRoutes = require('./routes/users');
const transactionRoutes = require('./routes/transactions');
const userAuth = require('./middlewares/auth');

app.use('/routes/auth', authRoutes);
app.use('/routes/products', productRoute);
app.use('/routes/users', userRoutes);
app.use('/routes/transactions', transactionRoutes);

  app.get('/verify-token', userAuth, (req, res) => {
    res.json({userRole: req.userRole,message: 'Success'});
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});