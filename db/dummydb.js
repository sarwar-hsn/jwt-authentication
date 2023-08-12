var users = [
    {
        'id': 1,
        'email': 'swr2514@gmail.com',
        'password': 'batterylow',
    },
    {
        'id': 2,
        'email': 'abd@gmail.com',
        'password': 'batterylow',
    },
    {
        'id': 3,
        'email': 'kk@gmail.com',
        'password': 'batterylow',
    }
]


var students = [
    {
        id: '161044121',
        name: 'sarwar',
    },
    {
        id: '161044120',
        name: 'furkorn',
    },
    {
        id: '161044119',
        name: 'ashraf',
    }
]


//this will hold session_id will be jit as key then { uuid , valid, token_type [access,refresh]}
var sessions_info = {
}


function get_students() {
    return students;
}

function get_student(id) {
    for (let i = 0; i < students.length; i++) {
        if (students[i].id == id) {
            return students[i]
        }
    }
}




function create_session(jti, uid) {
    const session = {
        uid,
        valid: true
    }
    sessions_info[jti] = session;
    return sessions_info[jti]
}
function get_session(jti) {
    const session = sessions_info[jti]
    if (session) {
        if (session.valid) {
            return session
        }
    }
    return null;
}

function invalidate_session(jti) {
    const session = sessions_info[jti]
    if (session) {
        sessions_info[jti].valid = false;
        return sessions_info[jti];
    }
}

function get_user(uid) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === uid) {
            return users[i]
        }
    }
    return null;
}

module.exports = {
    get_student,
    get_students,
    users,
    create_session,
    get_session,
    invalidate_session,
    get_user
}