const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/register', userController.register);
router.get('/names', userController.listNames);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

module.exports = router;