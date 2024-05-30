require('dotenv').config();
const app = require('./server');
const authRoutes = require('./routes/auth');
const productRoute = require('./routes/products')
const userRoutes = require('./routes/users');
const userAuth = require('./middlewares/auth');

app.use('/routes/auth', authRoutes);
app.use('/routes/products', productRoute);
app.use('/routes/users', userRoutes);

  // app.get('/verify-token', userAuth, (req, res) => {
  //   res.send(`Success`);
  // });

  app.get('/verify-token', userAuth, (req, res) => {
    res.json({userRole: req.userRole,message: 'Success'});
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});