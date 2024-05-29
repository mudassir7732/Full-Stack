const app = require('./server');
const authRoutes = require('./routes/auth');
const productRoute = require('./routes/products')
const userRoutes = require('./routes/users');

app.use('/routes/auth', authRoutes);
app.use('/routes/products', productRoute);
app.use('/routes/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});