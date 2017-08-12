/**
 * EmailEnquiry.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 * @createdBy   :: Suraksha
 * @created Date :: 11-Jul-2017
 */

module.exports = {
    tableName: 'Leads',
    connection: 'someMongodbServer',
    attributes: {

    },
    //Adds the user details who have enquired 
    addCommunicationLog: function(logObject, token, res) {
        var responseObj = {
            "statusCode": -1,
            "message": null
        }
        var findUserNames = []; //array of usernames to search for
        var userIds = [];
        var newValue = [];
        console.log('insert')
            // console.log(logObject)


        //insert the user details who have enquired details
        Leads.create(logObject).exec(function(err, record) {
            console.log("its here")
            if (err) {
                console.log(err)
            }
            if (record) {
                responseObj.statusCode = 3;
                responseObj.message = "Enquiry details added successfully !!";
                responseObj.result = [record]
                console.log(record)
                sails.log.info("EmailEnquiry model > EmailEnquiry > EmailEnquiry.add > ", responseObj.message);

                //  next(responseObj);
            } else {
                responseObj.message = "Unable to add EmailEnquiry !!";
                // next(responseObj);
            }
        });

    }

};