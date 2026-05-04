const express = require('express');
const { checkConnection } = require('./config/db');

const app = express();

app.use(express.json());

checkConnection();

module.exports = app;