const express = require('express');
const masterController = require('../controllers/masterController');
const router = express.Router();

router.post('/:userId/setup', masterController.makeMaster);
router.get('/', masterController.listAll);
router.get('/:id', masterController.show);
router.delete('/:id', masterController.remove);

module.exports = router;