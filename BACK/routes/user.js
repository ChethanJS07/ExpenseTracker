const express = require('express');
const {signUpUser, loginUser} = require('../controllers/user');
const router = express.Router();

//login routes
router.post('/login',loginUser);


//signup routes
router.post('/signup',signUpUser);


module.exports = router;