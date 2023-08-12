const { verify_jwt, sign_jwt, generateUniqueJTI, ACCESS_TOKEN_TIME } = require('../jwt/jwt.utils');
const { get_session } = require('../db/dummydb')


function deserialize_user(req, res, next) {

    const { access, refresh } = req.cookies;
    if (access) {
        const { payload: a_payload, expired: a_expired } = verify_jwt(access)
        if (a_payload && !a_expired) { //means jwt has been verified
            req.user = a_payload; //setting user in req
            return next();
        }
    }


    if (refresh) { //if access token expired but refresh token is there
        const { payload: r_payload, expired: r_expired } = verify_jwt(refresh)
        if (r_payload) { // if valid refresh token
            const session = get_session(r_payload.jti)
            if (session) {
                if (session.valid) { //refresh token is not black listed
                    const access_jti = generateUniqueJTI()
                    let new_access_token;
                    try {
                        new_access_token = sign_jwt({ uid: session.uid }, ACCESS_TOKEN_TIME, access_jti);
                    } catch (error) {
                        console.error("Error signing JWT:", error);
                        return res.status(401).send(error.message);
                    }


                    res.cookie("access", new_access_token, {
                        httpOnly: true,
                        maxAge: ACCESS_TOKEN_TIME,
                    })
                    req.user = verify_jwt(new_access_token).payload //setting user
                    console.log(`new access token issued using refresh token`);
                }
            }
        }
    } else {
        console.log('no refresh token or access token');
    }
    return next();
}


function auth_require(req, res, next) {
    if (!req.user) {
        return res.sendStatus(401)
    }
    next()
}


module.exports = {
    deserialize_user,
    auth_require
}

