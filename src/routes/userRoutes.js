const express = require('express');
const userController = require('../controllers/userController');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();

router.post('/register', upload.single('foto'), userController.register);
router.get('/names', userController.listNames);
router.put('/:id', upload.single('foto'), userController.update);
router.delete('/:id', userController.delete);

module.exports = router;