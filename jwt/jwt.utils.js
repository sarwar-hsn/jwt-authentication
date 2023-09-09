const jwt = require('jsonwebtoken')
const path = require('path')
const fs = require('fs');


const PRIVATE_KEY = fs.readFileSync(path.join(__dirname, 'private_key.pem'), 'utf8');
const PUBLIC_KEY = fs.readFileSync(path.join(__dirname, 'public_key.pem'), 'utf8');

const ACCESS_TOKEN_TIME = 60 //second
const REFRESH_TOKEN_TIME = 10//second




//signing jwt
function sign_jwt(payload, expire, jti) {
    return jwt.sign(payload, PRIVATE_KEY, {
        algorithm: 'RS256',
        expiresIn: expire,
        jwtid: jti
    })
}


function verify_jwt(token) {
    try {
        const decoded = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ['RS256']
        });
        return {
            payload: decoded,
            expired: false
        };
    } catch (error) {
        return {
            payload: null,
            expired: error.message.includes('expired')
        };
    }
}

const { randomUUID } = require('crypto');

function generateUniqueJTI() {
    return randomUUID()
}

module.exports = {
    sign_jwt,
    verify_jwt,
    generateUniqueJTI,
    ACCESS_TOKEN_TIME,
    REFRESH_TOKEN_TIME

}
