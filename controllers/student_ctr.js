const { get_students, get_student } = require('../db/dummydb')

function get_students_handler(req, res) {
    return res.json(get_students())
}

function get_student_handler(req, res) {
    let student_id = req.params.id
    let isNumber = !isNaN(student_id)
    if (isNumber) {
        console.log(`->${get_student(student_id)}`);
        return res.json(get_student(student_id))
    }
    return res.sendStatus(404)
}

module.exports = {
    get_students_handler,
    get_student_handler
}