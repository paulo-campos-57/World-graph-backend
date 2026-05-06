const express = require('express');
const { checkConnection } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const path = require('path');

const app = express();
app.use(express.json());

checkConnection();

app.use('/api/users', userRoutes);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

module.exports = app;