const express = require('express');
const { checkConnection } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const masterRoutes = require('./routes/masterRoutes');
const path = require('path');

const app = express();
app.use(express.json());

checkConnection();

app.use('/api/users', userRoutes);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/api/masters', masterRoutes);

app.get('/', (req, res) => {
    res.send('Bem-vindo à API do World Graph!');
});

module.exports = app;