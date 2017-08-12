/**
 * CategoryMaster.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 * @createdBy  :: Suraksha
 * @created Date :: 05-Jul-2017
 */

module.exports = {
    tableName: "CategoryMaster",
    connection: 'someMongodbServer',
    attributes: {

    },
    // Function to get all the existing Categories
    getCategoryDetails: function(credentialsObj, requestApi, token, next) {
        //Variable defined to create responseObj
        var responseObj = {
            "statusCode": -1,
            "message": null
        };
        var findUserNames = []; //array of usernames to search for
        var userIds = [];
        var newValue = [];

        //Variable defined to create dataLogObject
        var dataLogObject = {
            "userId": userIds,
            "requestApi": requestApi,
            "eventType": "add",
            "collection": "CategoryMaster",
            "newValue": newValue
        }

        // Check if Categories are  present

        CategoryMaster.find({ "isDeleted": false }).exec(function(err, record) {
            // console.log(record)
            if (record) {
                responseObj.statusCode = 3;
                responseObj.message = "CategoryMaster fecthed successfully !!";
                responseObj.result = [record]
                sails.log.info("CategoryMaster model > CategoryMaster > CategoryMaster.findOne > ", responseObj.message);

                next(responseObj);
            } else {
                responseObj.message = "Unable to fecth CategoryMaster!!";
                next(responseObj);
            }


        })
    },
    //Function to search product wise
    getCategory: function(credentialsObj, requestApi, token, next) {


        var responseObj = {
            "messages": ""
        };
        var findUserNames = []; //array of usernames to search for
        var userIds = [];
        var newValue = [];


        //Variable defined to create dataLogObject
        var dataLogObject = {
            "userId": userIds,
            "requestApi": requestApi,
            "eventType": "add",
            "collection": "ProductMaster",
            "newValue": newValue
        }


        //  var search = credentialsObj.param('search');
        //    var skip = credentialsObj.param('skip');

        CategoryMaster.native(function(err, collection) {
            if (err) {
                return next(err);
            } else {

                var prodUrl = ServConfigService.getApplicationConfig().grassgetProdBasedsearch
                collection.aggregate({
                        $project: {
                            _id: 0,
                            "grp": { $literal: "A" },

                            "url": { $concat: [prodUrl, "$categoryId", "/0"] },
                            "type": { $literal: "json_plugin_url" },
                            "title": "$categoryName"

                        }
                    },

                    // Stage 2
                    {
                        $group: {
                            _id: { grp: "$grp" },
                            "buttons": { $push: { "url": "$url", "type": "$type", "title": "$title" } }

                        }
                    },

                    // Stage 3
                    {
                        $project: {
                            _id: 0,
                            "text": { $literal: "Categories" },
                            "quick_replies": "$buttons"

                        }
                    }, {
                        $group: {
                            _id: "$_id.group",
                            data: { $push: "$$ROOT" }
                        }
                    }).toArray(function(err, record) {
                    var messages = {};
                    console.log("eeeeeeeeeeee")
                    console.log(record)

                    if (record) {


                        responseObj.messages = record;
                        sails.log.info("ProductMaster model > ProductMaster > ProductMaster.findOne > ", responseObj.message);

                        next(responseObj);
                    } else {
                        responseObj.messages = { "text": "Unable to fecth ProductMaster!!" };
                        next(responseObj);
                    }

                });





            }
        });
    }

};