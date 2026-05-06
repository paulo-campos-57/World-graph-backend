const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController')
const upload = require('../middleware/uploadMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', upload.single('foto'), userController.register);
router.post('/login', authController.login);

router.get('/names', authMiddleware, userController.listNames);
router.put('/:id', upload.single('foto'), authMiddleware, userController.update);
router.delete('/:id', authMiddleware, userController.delete);

module.exports = router;