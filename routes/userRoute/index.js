const express = require('express');
const router = express.Router();
const {loginUser, registerUser} = require('../../controllers/userController');
const {validateLogin, validateSignup} = require('../../middlewares/userValidator');

router.post('/login', validateLogin, loginUser);
router.post('/signup',validateSignup, registerUser);

module.exports = router;