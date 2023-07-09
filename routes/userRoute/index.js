const express = require('express');
const router = express.Router();
const {loginUser, registerUser, getUsers, get_a_user} = require('../../controllers/userController');
const {validateLogin, validateSignup} = require('../../middlewares/userValidator');

router.post('/login', validateLogin, loginUser);
router.post('/signup',validateSignup, registerUser);
router.get('/', getUsers);
router.get('/:id', get_a_user);

module.exports = router;