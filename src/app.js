const express = require('express');
const { checkConnection } = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

checkConnection();

app.use('/api/users', userRoutes);

module.exports = app;