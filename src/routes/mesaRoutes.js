const express = require('express');
const router = express.Router();
const mesaController = require('../controllers/mesaController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/',
    authMiddleware,
    upload.table.single('foto'),
    mesaController.create
);

module.exports = router;