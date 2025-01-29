const express = require('express');
const router = express.Router();
const { loginOwner, registerOwner } = require('../controllers/authController');
const isLoggedInOwner = require('../middlewares/isLoggedInOwner');


router.get('/loggedIn',isLoggedInOwner);
router.post('/register', registerOwner);
router.post('/login',loginOwner);


module.exports = router;