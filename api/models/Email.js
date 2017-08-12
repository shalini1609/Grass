/**
 * Email.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 * @createdBy  :: Suraksha
 * @created Date :: 11-Jul-2017
 */
"use strict";

var nodemailer = require('nodemailer');
var ses = require('nodemailer-ses-transport');
module.exports = {

    attributes: {

    },
    // Function to send emails to customerfirst@grassapparels.in
    sendEmail: function(reqBody, token, next) {

        //send responseObject
        var responseObj = {
            "statusCode": -1,
            "message": null
        }
        var findUserNames = []; //array of usernames to search for
        var userIds = [];
        var newValue = [];
        //PARAMETERS DEFINED TO SEND EMAIL
        var fromEmailId = reqBody.from; //sender Id registered with aws
        var toEmailId = reqBody.to; //array of recepientd
        var subject = reqBody.subject; //subject for email
        var text = reqBody.text //text which is to be defined to sending email
        console.log("123456")
        console.log(ServConfigService.getApplicationConfig())
            //create reusable transporter object using the SES transport
        var transporter = nodemailer.createTransport(ses({
            "accessKeyId": ServConfigService.getApplicationConfig().emailCredentials.accessKeyId,
            "secretAccessKey": ServConfigService.getApplicationConfig().emailCredentials.secretAccessKey
        }));

        // // Parameters for email sending is defined
        // var transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: 'info@annectos.in',
        //         pass: 'phoenixII'
        //     }
        // });
        // setup email data with unicode symbols
        var mailOptions = {
            from: fromEmailId,
            to: toEmailId,
            subject: subject,
            text: text
        }
        console.log("mailOptions", mailOptions);
        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, result) {
            if (error) {
                responseObj.message = error;
            } else {
                responseObj.statusCode = 0;
                responseObj.message = result;

            }
            next(responseObj);
        })

    }
};