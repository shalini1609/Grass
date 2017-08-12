/**
 * ProductMaster.js
 *
 * @description ::ProductMaster: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 * @createdBy   :: Suraksha
 * @created Date :: 05-Jul-2017
 */

module.exports = {
    tableName: "ProductMaster",
    connection: 'someMongodbServer',
    attributes: {

    },
    // Function to get all the product details
    getProductDetails: function(credentialsObj, requestApi, token, next) {

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
            "collection": "ProductMaster",
            "newValue": newValue
        }

        // Check if products are present

        ProductMaster.find({ "isDeleted": false }).exec(function(err, record) {
            //console.log(record)
            if (record) {
                responseObj.statusCode = 3;
                responseObj.message = "ProductMaster fecthed successfully !!";
                responseObj.result = [record]
                    //    sails.log.info("ProductMaster model > ProductMaster > ProductMaster.findOne > ", responseObj.message);

                next(responseObj);
            } else {
                responseObj.message = "Unable to fecth ProductMaster!!";
                next(responseObj);
            }


        })
    },
    // Function to get product details based on filter applied.
    getFilterProductDetails: function(credentialsObj, requestApi, token, next) {
        console.log('response');
        console.log(credentialsObj)
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
            "collection": "ProductMaster",
            "newValue": newValue
        }
        var search = credentialsObj.cat;
        console.log(search)
            //  var filter = 
        if (credentialsObj.gender != "" && credentialsObj.gender != undefined) {

            filter = { "isDeleted": false, "type": credentialsObj.gender, "$text": { "$search": credentialsObj.cat } }


        } else {
            filter = { "isDeleted": false, "$text": { "$search": search } }
        }
        // Check if request object contains more than a word 

        console.log(filter)
        ProductMaster.native(function(err, collection) {
            if (err) {
                return next(err);
            } else {



                collection.find(filter).toArray(function(err, record) {
                    console.log(record)
                    if (record) {
                        responseObj.statusCode = 3;
                        responseObj.message = "ProductMaster fecthed successfully !!";
                        responseObj.result = [record]
                        sails.log.info("ProductMaster model > ProductMaster > ProductMaster.findOne > ", responseObj.message);

                        next(responseObj);
                    } else {
                        responseObj.message = "Unable to fecth ProductMaster!!";
                        next(responseObj);
                    }


                })
            }
        });
        // console.log("filter")
        // console.log(filter)

    },

    // Function to get product details based on multiple filters applied.
    getMoreFilterProductDetails: function(credentialsObj, requestApi, token, next) {

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
            "collection": "ProductMaster",
            "newValue": newValue
        }
        var obj = credentialsObj;
        console.log(obj)
        if (obj.sub != 'Select SubCategory' && obj.sub != undefined && obj.type != 'Select Gender' && obj.type != undefined && obj.price != undefined && obj.price != 'Select Price') {
            var res = obj.price.split(",");
            console.log("22222")
            var a = parseInt(res[0]);
            var b = parseInt(res[1]);
            filter = { "$and": [{ "MRP": { "$gt": a } }, { "MRP": { "$lte": b } }, { "isDeleted": false }, { "subCategoryId": obj.sub }, { "categoryId": obj.cat }, { "type": obj.type }] }


        } else if (obj.sub != 'Select SubCategory' && obj.sub != undefined && obj.type != 'Select Gender' && obj.type != undefined) {

            console.log("111111")
            filter = { "$and": [{ "categoryId": obj.cat }, { "subCategoryId": obj.sub }, { "type": obj.type }] }
        } else if (obj.type != 'Select Gender' && obj.type != undefined) {

            filter = { "$and": [{ "isDeleted": false }, { "categoryId": obj.cat }, { "type": obj.type }] }


        } else if (obj.type != 'Select Gender' && obj.type != undefined && obj.price != undefined && obj.price != 'Select Price') {
            var res = obj.price.split(",");
            // console.log(res)
            var a = parseInt(res[0]);
            var b = parseInt(res[1]);
            filter = { "$and": [{ "MRP": { "$gt": a } }, { "MRP": { "$lte": b } }, { "isDeleted": false }, { "categoryId": obj.cat }, { "type": obj.type }] }


        } else if (obj.price != 'Select Price' && obj.sub != 'Select SubCategory' && obj.price != undefined && obj.sub != undefined) {
            var res = obj.price.split(",");
            // console.log(res)
            var a = parseInt(res[0]);
            var b = parseInt(res[1]);
            filter = { "$and": [{ "MRP": { "$gt": a } }, { "MRP": { "$lte": b } }, { "isDeleted": false }, { "categoryId": obj.cat }, { "subCategoryId": obj.sub }] }
        } else if (obj.price != 'Select Price' && obj.price != undefined) {

            var res = obj.price.split(",");
            // console.log(res)
            var a = parseInt(res[0]);
            var b = parseInt(res[1]);
            filter = { "$and": [{ "MRP": { "$gt": a } }, { "MRP": { "$lte": b } }, { "isDeleted": false }, { "categoryId": obj.cat }] }
        } else if (obj.sub != 'Select SubCategory' && obj.sub != undefined) {


            filter = { "$and": [{ "categoryId": obj.cat }, { "subCategoryId": obj.sub }] }
        } else {
            filter = { "categoryId": obj.cat }
        }

        // Check if request object contains search by amount range
        // if (filter.includes(',')) {
        //     var res = credentialsObj.cat.split(",");
        //     // console.log(res)
        //     var a = parseInt(res[0]);
        //     var b = parseInt(res[1]);
        //     filter = { "$and": [{ "MRP": { "$gt": a } }, { "MRP": { "$lte": b } }, { "isDeleted": false }] }
        // }
        console.log(filter)
        ProductMaster.find(filter).exec(function(err, record) {
            // console.log(record)
            if (record) {
                responseObj.statusCode = 3;
                responseObj.message = "ProductMaster fecthed successfully !!";
                responseObj.result = [record]
                sails.log.info("ProductMaster model > ProductMaster > ProductMaster.findOne > ", responseObj.message);

                next(responseObj);
            } else {
                responseObj.message = "Unable to fecth ProductMaster!!";
                next(responseObj);
            }


        })
    },


    //Function to search product wise
    getProductBasedSearch: function(credentialsObj, requestApi, token, next) {


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


        var search = credentialsObj.param('search');
        var skip = credentialsObj.param('skip');

        ProductMaster.native(function(err, collection) {
            if (err) {
                return next(err);
            } else {

                var prodUrl = ServConfigService.getApplicationConfig().grassgetProdBasedsearch

                collection.find({ "isDeleted": false, "$text": { "$search": search } }).count(function(err, record1) {
                    if (err) {
                        return next(err);
                    } else {
                        var count = record1;

                        console.log(count);


                        var limit = 10;
                        if (count > 10) {
                            limit = 9;
                        }

                        collection.aggregate({
                                $match: {
                                    "isDeleted": false,
                                    $text: { $search: search }
                                }
                            }, { "$skip": parseInt(skip) }, { "$limit": limit },
                            // Stage 2
                            {
                                $project: {
                                    _id: 0,
                                    "grp": { $literal: "a" },
                                    "title": "$productName",
                                    "subtitle": "$shortDescription",
                                    "image_url": { $arrayElemAt: ["$image", 0] },
                                    "buttons": [{
                                            "set_attributes": {
                                                "sku": "$SKU",
                                            },
                                            "block_name": { $literal: "Enquiry" },
                                            "type": { $literal: "show_block" },
                                            "title": { $literal: "Send Enquiry" }
                                        },
                                        {
                                            "type": { $literal: "element_share" }
                                        }
                                    ]

                                }
                            },

                            // Stage 3
                            {
                                $group: {
                                    _id: { grp: "$grp" },
                                    "elements": { $push: { title: "$title", subtitle: "$subtitle", image_url: "$image_url", buttons: "$buttons" } }
                                }
                            },

                            // Stage 4
                            {
                                $project: {
                                    // specifications
                                    _id: 0,
                                    "attachment": {
                                        "type": { $literal: "template" },
                                        "payload": {
                                            "template_type": { $literal: "generic" },
                                            "image_aspect_ratio": { $literal: "square" },
                                            "elements": "$elements"
                                        }
                                    }
                                }
                            }, {
                                $group: {
                                    _id: "$_id.group",
                                    data: { $push: "$$ROOT" }
                                }
                            }).toArray(function(err, record) {
                            if (err) { console.log(err) }
                            var messages = {};
                            console.log(record)

                            if (record) {
                                // responseObj.statusCode = 3;
                                // responseObj.message = "ProductMaster fecthed successfully !!";

                                var nextt = {};
                                var prev = {};
                                var val = parseInt(skip) + 1;
                                var pageCount = Math.ceil(count / 10);
                                var obj = {
                                        "attachment": {
                                            "payload": {
                                                "template_type": "button",
                                                "text": "Page " + val + " of " + pageCount,
                                                "buttons": []

                                            },
                                            "type": "template"
                                        }
                                    }
                                    //console.log(record.attachment)
                                if (pageCount != 1) {

                                    if (val < pageCount) {
                                        // var val = parseInt(skip) + 1

                                        nextt = {
                                            "url": prodUrl + search + "/" + val,
                                            "type": "json_plugin_url",
                                            "title": "Next"
                                        }
                                        obj.attachment.payload.buttons.push(nextt)
                                    }
                                    if (val != 1) {
                                        val = val - 2;

                                        prev = {
                                            "url": prodUrl + search + "/" + val,
                                            "type": "json_plugin_url",
                                            "title": "Previous"
                                        }
                                        obj.attachment.payload.buttons.push(prev)
                                    }

                                    record.push(obj)
                                }
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
        });
    }
};