/**
 * Common Operations.js
 *
 * @description     :: To perform common operations  especially ROLLBACK
 * @createdBy       :: Ajeet
 * @created Date    :: 19-01-2017
 * @Last edited by  :: 
 * @last edited date::
 */

"use strict";

module.exports = {


    //----------------------------------------------------------------------------------------------------------//

    /*
	# Method: deleteRecord
	# Description: to delete any record in database
	# Input: Model name,array of IDs to delete and callback function
	# Output : response with success or error
  	*/


    deleteRecord: function(Model, fieldName, ids, token, next) {

        // default response object
        var responseObj = {
            statusCode: -1,
            message: null,
            result: null
        };

        console.log("ids is", ids);
        console.log("fieldName is", fieldName);
        var queryString;
        if (fieldName === "businessId") {
            queryString = { businessId: ids };
        } else if (fieldName === "userId") {
            queryString = { userId: ids };
        }

        Model.destroy(queryString).exec(function(error, deletedRecords) {
            if (error || !deletedRecords) {
                console.log("Unable to delete record", err, deletedRecords);
                responseObj.statusCode = -2;
                responseObj.message = "Fatal Integrity Error : Business entity created but failed to create user";
                responseObj.result = businessId;
                sails.log.error("CommonOperations>deleteRecord>BusinessEntityUserMaster.destroy ", "records to be deleted:" + ids, " error:" + error);
                return next(responseObj);
            } else {
                if (deletedRecords.length === 0) {
                    responseObj.statusCode = -2;
                    responseObj.message = "Fatal Integrity Error : Business entity created but failed to create user";
                    responseObj.result = businessId;
                    sails.log.error("CommonOperations>deleteRecord>BusinessEntityUserMaster.destroy ", "records to be deleted:" + ids, " error:" + error);
                    return next(responseObj);
                } else { // success: records deleted
                    console.log("deleted records is", deletedRecords);
                    responseObj.statusCode = 0;
                    responseObj.message = "Record successfully deleted";
                    sails.log.info("CommonOperations>deleteRecord>BusinessEntityUserMaster.destroy: record is successfully destroyed");
                    return next(responseObj);
                }
            }
        });
    },

    //----------------------------------------------------------------------------------------------------------//


    /*
    # Method: updateRecord
    # Description: to update any record in database
    # Input: Model name,array of IDs to update, and callback function
    # Output : response with success or error
    */


    updateRecord: function(Model, fieldName, ids, updateInfo, token, next) {
        var responseObj = {
            statusCode: -1,
            message: null,
            result: null
        };
        var Model;
        console.log("ids is", ids);
        console.log("fieldName is", fieldName);
        var queryString;
        if (fieldName === "businessId") {
            queryString = { businessId: ids }; // to undelete a record
        } else if (fieldName === "userId") {
            queryString = { userId: ids };
        }

        if (Model === "BusinessEntityStagingMaster") {
            console.log("Inside if condition");
            Model = BusinessEntityStagingMaster
        }
        //console.log("modelName",Model);
        //console.log("queryString",queryString ,"updateInfo",updateInfo);

        Model.update(queryString, updateInfo).exec(function(error, updatedRecords) {

            if (error || !updatedRecords) {
                //console.log("Unable to delete record",error,updatedRecords);
                responseObj.statusCode = -1;
                responseObj.message = "Record Updation Failed" + error;
                sails.log.error("CommonOperations>updateRecord>BusinessEntityUserMaster.update ", "records to be updated:" + ids, " error:" + error);
                return next(responseObj);
            } else {
                if (updatedRecords.length === 0) { // no records found or some error
                    responseObj.statusCode = 2;
                    responseObj.message = "No Record found!!!";
                    sails.log.error("CommonOperations>updateRecord>BusinessEntityUserMaster.update ", "records to be updated:" + ids, " error:" + error);
                    return next(responseObj);
                } else { // success: records updated
                    //console.log("updated records is",updatedRecords);
                    responseObj.statusCode = 0;
                    responseObj.message = "Record successfully updated";
                    responseObj.result = updatedRecords;
                    sails.log.info("CommonOperations>updateRecord>BusinessEntityUserMaster.update: record is successfully updated");
                    return next(responseObj);
                }
            }
        });
    },

    //----------------------------------------------------------------------------------------------------------//

    //----------------------------------------------------------------------------------------------------------//


    /*
    # Method: findRecord
    # Description: to find any record in database
    # Input: Model name,array of IDs to update, and callback function
    # Output : response with success or error
    */


    findRecords: function(Model, fieldName, ids, token, next) {
        var responseObj = {
            statusCode: -1,
            message: null,
            result: null
        };

        console.log("ids is", ids);
        console.log("fieldName is", fieldName);
        var queryString;
        if (fieldName === "businessId") {
            queryString = { businessId: ids };
        } else if (fieldName === "userId") {
            queryString = { userId: ids };
        }

        Model.find(queryString, updateInfo).exec(function(error, records) {
            if (error || !updatedRecords) {
                console.log("Unable to delete record", error, records);
                responseObj.statusCode = -1;
                responseObj.message = "Record Updation Failed" + error;
                sails.log.error("CommonOperations>updateRecord>BusinessEntityUserMaster.update ", "records to be updated:" + ids, " error:" + error);
                return next(responseObj);
            } else {
                if (updatedRecords.length === 0) { // no records found or some error
                    responseObj.statusCode = 2;
                    responseObj.message = "No Record found!!!";
                    sails.log.error("CommonOperations>updateRecord>BusinessEntityUserMaster.update ", "records to be updated:" + ids, " error:" + error);
                    return next(responseObj);
                } else { // success: records updated
                    console.log("updated records is", records);
                    responseObj.statusCode = 0;
                    responseObj.message = "Record successfully found";
                    responseObj.result = records;
                    sails.log.info("CommonOperations>updateRecord>BusinessEntityUserMaster.update: record is successfully destroyed");
                    return next(responseObj);
                }
            }
        });
    },

    //----------------------------------------------------------------------------------------------------------//


    //----------------------------------------------------------------------------------------------------------//

    /*
    # Method: findCount
    # Description: to find count of all records in a collection
    # Input: Model name,token,callback function
    # Output : response with success or error
    */

    findCount: function(Model, queryString, token, next) {
        // default response object
        var responseObj = {
            statusCode: -1,
            message: null,
            result: null
        };

        var collectionName = Model;
        console.log("Finding Count of:", Model);

        if (Model === "BusinessEntityMaster") {
            Model = BusinessEntityMaster;
        } else if (Model === "BusinessEntityStagingMaster") {
            Model = BusinessEntityStagingMaster;
        } else if (Model === "BusinessEntityUserStagingMaster") {
            Model = BusinessEntityUserStagingMaster;
        }


        Model.count(queryString).exec(function(err, foundCount) {
            console.log("queryString is", queryString, "foundCount is", foundCount);
            if (err || !foundCount) {
                responseObj.message = "Count cound not be fetched: " + err;
                //console.log("Finding count Failure:",err);
                sails.log.error("CommonOperations > findCount > " + collectionName + "Error" + err);
            } else {
                //console.log("counts found:",foundCount);
                responseObj.statusCode = 0;
                responseObj.message = "counts fetched successfully";
                responseObj.result = foundCount;
                sails.log.info("CommonOperations > findCount > " + collectionName + " Counts fetched successfully");

            }
            next(responseObj);
        });

    }


};