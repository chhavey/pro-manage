const router = require('express').Router();
const requireAuth = require('../middlewares/requireAuth');
const { register, login, settings } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.put('/settings', requireAuth, settings);

module.exports = router;