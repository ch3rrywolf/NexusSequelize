const JWT = require("jsonwebtoken");

const singAccessToken = (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            name : "wolf"
        };
        const secret = "secret is here";
        const options = {
            subject : `${userId}`,
            audience: 'dsi-tdsk.com',
            expiresIn: '1h'
        }

        JWT.sign(payload, secret, options, (err, token) => {
            if(err) reject(err);
            resolve(token);
        })
    })
}

module.exports = { singAccessToken }