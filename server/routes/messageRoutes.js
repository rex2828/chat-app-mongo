const express = require('express');
const { addMsg, getAllMsg } = require('../controllers/messageControllers');
const router = express.Router();

router.post('/addMsg', addMsg);
router.post('/getMsg', getAllMsg);

module.exports = router;