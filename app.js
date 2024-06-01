const express = require('express');
const path = require('path');
const { sequelize } = require('./models');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const destinasiRoutes = require('./routes/destinasi');
const reviewRoutes = require('./routes/reviews');
const internalRoutes = require('./routes/internals');

const app = express();
app.use(express.json());

// Serve uploads folder as static
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/destinasi', destinasiRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/internals', internalRoutes);

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}/api`; // Gunakan localhost

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Base URL for API: ${BASE_URL}`);
  
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
