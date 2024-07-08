const JWT = require("jsonwebtoken");

const singAccessToken = (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            name : "wolf"
        };
        const secret = "secret is here";
        const options = {}

        JWT.sign(payload, secret, options, (err, token) => {
            if(err) reject(err);
            resolve(token);
        })
    })
}

module.exports = { singAccessToken }