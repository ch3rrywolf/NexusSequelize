const JWT = require("jsonwebtoken");
const createError = require("http-errors");

const singAccessToken = (userId) => {
    return new Promise((resolve, reject) => {

        const payload = {};
        const secret = process.env.ACCESS_TOKEN_SECRET;

        const options = {
            subject : `${userId}`,
            audience: 'dsi-tdsk.com',
            expiresIn: '20s'
        }

        JWT.sign(payload, secret, options, (err, token) => {
            if(err){ 
                //reject(err);
                reject(createError.InternalServerError())
            }
            resolve(token);
        })
    })
}

const verifyAccessToken = (req, res, next) => {
    if(!req.headers['authorization']) throw next(createError.Unauthorized());
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];

    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if(err) {
            /*if(err.name == 'JsonWebTokenError'){
                return next(createError.Unauthorized(err.message));
            } else{
                return next(createError.Unauthorized(err.message));
            } */
            const message = err.name == 'JsonWebTokenError' ? 'Unauthorized' : err.message;
            return next(createError.Unauthorized(message));
        }
        req.payload = payload;
        next()
    })
}

const singRefreshToken = (userId) => {
    return new Promise((resolve, reject) => {

        const payload = {};
        const secret = process.env.REFRESH_TOKEN_SECRET;

        const options = {
            subject : `${userId}`,
            audience: 'dsi-tdsk.com',
            expiresIn: '1m'
        }

        JWT.sign(payload, secret, options, (err, token) => {
            if(err){ 
                //reject(err);
                reject(createError.InternalServerError())
            }
            resolve(token);
        })
    })
}

const verifyRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {

            if(err) return reject(createError.Unauthorized());

            const userId = payload.sub;

            resolve(userId);
        })
    })
}


module.exports = { singAccessToken, verifyAccessToken, singRefreshToken, verifyRefreshToken }