/**
 * BusinessEntityUserMaster.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
"use strict";
var request = require('request');
var async = require('async');
module.exports = {
    tableName: 'BusinessEntityUserMaster',
    attributes: {

    },

    getEntityDetails: function(query, next, callBack) {
        var responseObj = {
            "statusCode": -1,
            "message": null,
            "result": null
        };
        var userObject;
        var apiURL;
        var requestOptions = {};

        var entityCode = query


        var search = { "mobileNumber": entityCode }
            //  var search = [{ "businessId":{$in: [entityCode]} }];
        console.log(search)
        BusinessEntityUserMaster.find(search).exec(function(err, result) {
            if (err) {
                res.send(400);
            } else {
                sails.log("fecthed data  from User MAssssster")

                console.log(result.length)
                if (result.length > 0) {
                    responseObj.result = result
                    console.log(result)
                    var programInfo = {};
                    var reqObj = {}
                    var purchaseDetails = [];
                    var obj;
                    responseObj.statusCode = -1;
                    responseObj.message = "Referer does not exists !!";
                    responseObj.result = result;
                    next(result);
                } else {
                    responseObj.statusCode = -1;
                    responseObj.message = "Referer does not exists !!";
                    next(responseObj);
                }

            }
        });
    }
};