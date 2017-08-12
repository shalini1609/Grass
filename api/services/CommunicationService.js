/**
 * CommunicationService.js
 *
 * @description 	 :: Communication Service :  To send sms,email and push notifications to users
 * @created          :: Ajeet
 * @Created  Date    :: 02/04/2016
 * @lastEdited       :: 
 * @lastEdited Date  :: 
 *
 */

"use strict";

var request = require('request');

module.exports = {



	/*
    # Method: sendSms
    # Description: to SEND SMS TO USERS
    */    

	sendSms : function(reqBody,token){

		// default response object
        var responseObj = {
            "statusCode":-1,
            "message":null,
            "result":null
        };


        var mobileNumber = reqBody.mobileNumber; // mobile no to which sms to be sent 
        var message = reqBody.message;           // message to be sent
        var communicationLogInfo  = {}  //request object to add communication logs

        communicationLogInfo.communicationType = "SMS";
        communicationLogInfo.sendTo = mobileNumber;
        communicationLogInfo.message = message;
        communicationLogInfo.userId = reqBody.userId;

        var reqObject = {                       // json req object
            "mobileNumber":mobileNumber,
            "message":message,
            "communicationLogInfo":communicationLogInfo
        }

        //api to send sms
        var apiURL  = ServConfigService.getApplicationConfig().base_url
                    + ":"
                    + ServConfigService.getApplicationAPIs().sendSms.port
                    + ServConfigService.getApplicationAPIs().sendSms.url;


        //request options to fetch program user
        var requestOptions = {
            url:apiURL,
            method:ServConfigService.getApplicationAPIs().sendSms.method,
            headers: {
                'authorization' : 'Bearer ' + token
            },
            json:reqObject
        };

	    //console.log("requestOptions",requestOptions);

        // consuming the SMS API
        request(requestOptions,function(error,response,body){
            //console.log("SMS body is",body,"error is",error);
            if(error || !body){      // some error occured
                responseObj.statusCode = -1;
                responseObj.message = "Error occured while consuming SMS API";
            }
            else if(body.statusCode === 0 ){
                responseObj.statusCode = 0;
                responseObj.message = "SMS sent Successfully!!";
                responseObj.result = mobileNumber;
            }
            else{
                responseObj = body;
            }

	    });

    },

//--------------------------------------SEND EMAIL--------------------------------------------------------------------//

    /*
    # Method: sendEmail
    # Description: to sendEmail to users
    */   

    sendEmail: function(reqBody,token){

        //send responseObject
        var responseObj = {
            "statusCode":-1,
            "message":null
        }

        var communicationLogInfo = [];

        var userLength = reqBody.userIds.length;

        for(var i=0; i<userLength; i++){
            var logObject = {};

            logObject.communicationType = "EMAIL";
            logObject.sendTo = reqBody.emailIds[i];
            logObject.message = reqBody.subject;
            logObject.userId = reqBody.userIds[i];

            communicationLogInfo.push(logObject);
        }
        //reqObject for sending email
        var reqObject = {
            from: "info@annectos.in",
            to: reqBody.emailIds,
            subject: reqBody.subject,
            text: reqBody.text,
            communicationLogInfo : communicationLogInfo
        }

        //api to send sms
        var apiURL  = ServConfigService.getApplicationConfig().base_url
                    + ":"
                    + ServConfigService.getApplicationAPIs().sendEmail.port
                    + ServConfigService.getApplicationAPIs().sendEmail.url;


        //request options to fetch program user
        var requestOptions = {
            url:apiURL,
            method:ServConfigService.getApplicationAPIs().sendEmail.method,
            headers: {
                'authorization' : 'Bearer ' + token
            },
            json:reqObject
        };

        //consuming email api
        request(requestOptions,function(error,response,body){
            //console.log("Email body is",body,"error is",error);
            if(error || !body){      // some error occured
                responseObj.statusCode = -1;
                responseObj.message = "Error occured while consuming Email API";
            }
            else if(body.statusCode === 0 ){
                responseObj.statusCode = 0;
                responseObj.message = "Email sent successfully !!";
                responseObj.result = body.result;
            }
            else{
                responseObj = body;
            }

        });
    },

sendPushNotification : function (reqBody, token) {

    console.log("notification service called");
    //send responseObject
    var responseObj = {
        "statusCode": -1,
        "message": null
    }

    var notificationDetails = {
        "title": reqBody.title,
        "message": reqBody.message,
        "targetScreen": reqBody.targetScreen
    }

    //reqObject for sending pushNotification
    var reqObject = {
        userIds: reqBody.userId,
        notificationDetails: notificationDetails
    }

    //api to send sms
    var apiURL = ServConfigService
        .getApplicationConfig()
        .base_url + ":" + ServConfigService
        .getApplicationAPIs()
        .sendPushNotification
        .port + ServConfigService
        .getApplicationAPIs()
        .sendPushNotification
        .url;

    //request options to fetch program user
    var requestOptions = {
        url: apiURL,
        method: ServConfigService
            .getApplicationAPIs()
            .sendPushNotification
            .method,
        headers: {
            'authorization': 'Bearer ' + token
        },
        json: reqObject
    };

    console.log("requestOptions", requestOptions);
    //consuming email api
    request(requestOptions, function (error, response, body) {
        console.log("body is", body, "error is", error);
        if (error || !body) { // some error occured
            responseObj.statusCode = -1;
            responseObj.message = "Error occured while consuming notification API";
        } else if (body.statusCode === 0) {
            responseObj.statusCode = 0;
            responseObj.message = "Notification sent successfully !!";
            //responseObj.result = body.result;
        } else {
            responseObj = body;
        }

    });
}                                                                                                                                                                                                                                                                                                                                           																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																												
}