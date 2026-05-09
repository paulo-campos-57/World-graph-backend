const express = require('express');
const cors = require('cors');
const path = require('path');
const { checkConnection } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const masterRoutes = require('./routes/masterRoutes');
const playerRoutes = require('./routes/playerRoutes');
const mesaRoutes = require('./routes/mesaRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(errorMiddleware);

checkConnection();

app.use('/api/users', userRoutes);
app.use('/uploads/profile-pics', express.static(path.join(__dirname, '../uploads/profile-pics')));
app.use('/uploads/table-pic', express.static(path.join(__dirname, '../uploads/table-pic')));
app.use('/api/masters', masterRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/mesas', mesaRoutes);

app.get('/', (req, res) => {
    res.send('Bem-vindo à API do World Graph!');
});

module.exports = app;