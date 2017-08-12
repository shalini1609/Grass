/**
 * isAuthorized
 * @description      :: Policy to check if user is authorized with JSON web token
 * @created          :: Chetan
 * @Created  Date    :: 17/10/2016
 * @lastEdited       :: Chetan
 * @lastEdited Date  :: 17/10/2016
 */

"use strict";

module.exports = function (req, res, next) {
    var token;

    if (req.headers && req.headers.authorization) {
        var parts = req.headers.authorization.split(' ');
        if (parts.length == 2) {
            var scheme = parts[0],
            credentials = parts[1];

            if (/^Bearer$/i.test(scheme)) {
                token = credentials;
            }
        } else {
            return res.json(401, {
                response: "Error",
                message: 'Format is Authorization: Bearer [token]'
            });
        }
    } else if (req.param('token')) {
        token = req.param('token');
        // We delete the token from param to not mess with blueprints
        delete req.query.token;
    } else {
        return res.json(401, {
            response: "Error",
            message: 'No Authorization header was found'
        });
    }

    //console.log('token is',token);  
    JWTService.verify(token, function (err, resToken) {
        if (err)
            return res.json(401, {
                response: "Error",
                statusCode:1,
                message: 'Invalid Token!'
            });
            req.token = token; // This is the decrypted token or the payload you provided
            next();
    });
};