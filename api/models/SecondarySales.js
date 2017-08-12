/**
 * SecondarySales.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
"use strict";
var request = require('request');
var async = require('async');
module.exports = {
    connection: 'someMongodbServer',
    tableName: 'SecondarySales',
    attributes: {
        secondarySalesId: { //unique id to identify each record in collection
            type: 'string',
            primaryKey: true,
            unique: true,
            required: true
        },
        programId: { // to identify which program secondary sales belongs to			
            type: 'string',
            required: true
        },
        creditPartyId: { // id of credit party
            type: 'string'
        },
        creditPartyName: {
            type: 'string'
        },
        creditPartyMobileNumber: {
            type: 'string'
        },
        debitPartyId: { // id of debit party
            type: 'string'
        },
        debitPartyName: {
            type: 'string'
        },
        debitPartyMobileNumber: {
            type: 'string'
        },
        invoiceNumber: { // if program is invoice based
            type: 'string'
        },
        invoiceAmount: { //  if program is invoice based
            type: 'float'
        },
        invoiceAmountExcludingVAT: { // if program is invoice based
            type: 'float'
        },
        transactionDate: { // date at which transaction was made  --- date of invoice incase of invoice date
            type: 'date',
            required: true
        },
        invoiceDocument: { // pdf or image of invoice
            type: 'string'
        },
        boosterCode: {
            type: 'string'
        },
        vatPercentage: { //vatPercent to be applied for all product/brand
            type: 'float'
        },
        purchaseDetails: { // will be there in case of invoice or digital based
            type: 'array'
        },
        isCreditPartyMapped: { // whether credit party is mapped in program
            type: 'boolean',
            required: true
        },
        isDebitPartyMapped: { // whether debit party is mapped in program
            type: 'boolean',
            required: true
        },
        pointsEarned: { //will total sale + booster point
            type: 'float',
            defaultsTo: 0
        },
        /* isParentUserMapped:{
             type:'boolean',
             required:true
         },*/
        transactionStatus: { // will be true if both party exists
            type: 'boolean',
            required: true
        },
        approvalStatus: { // pending, approved or rejected	
            type: 'string',
            required: true,
            enum: ['pending', 'approved', 'rejected'],
            defaultsTo: 'pending'
        },
        comment: {
            type: 'string'
        },
        isDeleted: {
            type: 'boolean',
            defaultsTo: false
        }
    },
    addSecondarySale: function(response, programInfo, token, userLogObject, next) {

        var responseObj = {};


        var programInfo = {};
        var reqObj = response;
        var purchaseDetails = [];
        var obj;

        //console.log(JSON.stringify(purchaseDetails))


        console.log("coming");
        // console.log(ServConfigService.getApplicationAPIs().addSecondarySale.url)
        //   console.log(JSON.stringify(reqObj));
        // apiURL = ServConfigService.getApplicationConfig().base_url +
        //     ":" +
        //     ServConfigService.getApplicationAPIs().addSecondarySale.port +
        //     ServConfigService.getApplicationAPIs().addSecondarySale.url
        var requestOptions = {
            url: 'http://phoenix2backend.goldencircle.in:1334/addSecondarySale/v1',
            method: 'post', //ServConfigService.getApplicationAPIs().addSecondarySale.method,
            headers: {
                'authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkFVMTQ5NDA3NjEwMjcyNCIsImlhdCI6MTQ5NDk5OTMzNH0.LRScgf-UX1wAY5SLTsMqK80ou04Ho1oZ1RpFkDpyP313g3ZvonSfmX1OYcDOsOi1Bs4XnO34tg3QAzn5gG46Sg'
            },
            json: reqObj
        };
        console.log(reqObj)
        request(requestOptions, function(error, response, body) {
            if (error || body === undefined) {
                console.log("error ", error, "body ", body)
                responseObj.statusCode = 2;
                responseObj.message = "Error occurred while fetching records from program users!!";
                next(responseObj);
            } else {
                if (body.statusCode === 0) {
                    console.log("records 0");
                    responseObj.statusCode = 0;
                    responseObj.message = "Order Placed  successfully !!";
                    console.log("user info is", responseObj.result);
                    responseObj.result = body.result;
                } else if (body.statusCode === 2) {
                    console.log("records failed");
                    responseObj.statusCode = 2;
                    responseObj.message = "Failed to fetch records";
                } else {
                    console.log("records", body);
                    responseObj = response.body;
                }
                next(responseObj);
            }

        })


    }

    // end of request


};