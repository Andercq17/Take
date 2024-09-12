const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware.authenticate, userController.getAllUsers);
router.get('/:id', authMiddleware.authenticate, userController.getUserById);

module.exports = router;
