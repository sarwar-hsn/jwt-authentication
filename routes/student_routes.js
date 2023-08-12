const { Router } = require('express')
const { students } = require('../db/dummydb');
const { get_students_handler, get_student_handler } = require('../controllers/student_ctr')

const router = Router();

router.get('/students', get_students_handler)

router.get('/students/:id', get_student_handler);


module.exports = router;