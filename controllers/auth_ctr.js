const { users, get_session, create_session } = require('../db/dummydb')
const {
    sign_jwt, verify_jwt, generateUniqueJTI,
    ACCESS_TOKEN_TIME, REFRESH_TOKEN_TIME
} = require('../jwt/jwt.utils')



const REFRESH = 'refresh'


function login_controller(req, res) {
    let { email, password } = req.body
    let user_found = undefined
    if (email && password) {
        for (let i = 0; i < users.length; i++) {
            if ((users[i].email == email) && (users[i].password === password)) {
                user_found = users[i]
                break;
            }
        }
    }
    if (!user_found) {
        return res.sendStatus(401)
    }

    const access_jti = generateUniqueJTI();
    const refresh_jti = generateUniqueJTI();
    //creating token
    const access = sign_jwt({
        email:user_found.email,
        clyid: user_found.id,
    }, ACCESS_TOKEN_TIME, access_jti) // 1 min access token

    //creating refresh token
    const refresh = sign_jwt({
        email:user_found.email,
        clyid: user_found.id,
    }, REFRESH_TOKEN_TIME, refresh_jti) //5 min refresh token

    //setting access token
    res.cookie("access", access, {
        httpOnly: true,
        maxAge: ACCESS_TOKEN_TIME,
    })
    //setting refresh token 
    res.cookie("refresh", refresh, {
        httpOnly: true,
        maxAge: REFRESH_TOKEN_TIME,
    })

    //adding refresh token to db
    const refresh_session = create_session(
        refresh_jti,
        user_found.id,
        REFRESH
    )
    return res.json({
        access,
        refresh,
        refresh_session
    })
}

module.exports = {
    login_controller,
}