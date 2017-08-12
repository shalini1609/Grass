/**
 * SubCategoryMaster.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 * @createdBy  :: Suraksha
 * @created Date :: 05-Jul-2017
 */

module.exports = {
    tableName: "SubCategoryMaster",
    connection: 'someMongodbServer',
    attributes: {

    },
    getSubCategoryDetails: function(credentialsObj, requestApi, token, next) {

        var responseObj = {
            "statusCode": -1,
            "message": null
        };


        //Variable defined to create dataLogObject
        var dataLogObject = {
            "userId": userIds,
            "requestApi": requestApi,
            "eventType": "add",
            "collection": "SubCategoryMaster",
            "newValue": newValue
        }
        var findUserNames = []; //array of usernames to search for
        var userIds = [];
        var newValue = [];
        // Check if SubCategoryMaster are  present

        SubCategoryMaster.find({ "isDeleted": false, "parentId": credentialsObj.cat }).exec(function(err, record) {
            console.log(record)
            if (record) {
                responseObj.statusCode = 3;
                responseObj.message = "SubCategoryMaster fecthed successfully !!";
                responseObj.result = [record]
                sails.log.info("SubCategoryMaster model > SubCategoryMaster > SubCategoryMaster.findOne > ", responseObj.message);

                next(responseObj);
            } else {
                responseObj.message = "Unable to fecth SubCategoryMaster!!";
                next(responseObj);
            }


        })
    }
};