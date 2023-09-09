const { Router } = require('express')
const { login_controller } = require('../controllers/auth_ctr')
const router = Router();

router.post('/login', login_controller)


module.exports = router