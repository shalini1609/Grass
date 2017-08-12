/**
 * JWT
 * @description      :: JSON Webtoken Service for sails
 * @created          :: Chetan
 * @Created  Date    :: 12/10/2016
 * @lastEdited       :: Chetan
 * @lastEdited Date  :: 12/10/2016
 */

"use strict";

var jwt = require('jsonwebtoken');

// Generates a token from supplied payload
module.exports.issue = function(payload) {
    return jwt.sign(
        payload,
        ServConfigService.getJwtSecretToken(), // Token Secret that we sign it with
        //ServConfigService.getJwtSecretToken(), // Token Secret that we sign it with
        {
            algorithm: 'HS512'
        }
    );
};

// Verifies token on a request
module.exports.verify = function(token, callback) {
    return jwt.verify(
        token, // The token to be verified
        ServConfigService.getJwtSecretToken(), // Token Secret that we sign it with
        //ServConfigService.getJwtSecretToken(), // Same token we used to sign
        {
            algorithm: 'HS512'
        },
        callback//Pass errors or decoded token to callback
    );
};