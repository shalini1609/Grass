/**
 * LinkdIn.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    tableName: "user_email",
    connection: 'someMongodbServer3',

    attributes: {

    },
    addLogs: function(body, token, res) {
        var responseObj = {
            "statusCode": -1,
            "message": null
        }
        var logObject = {};
        var findUserNames = []; //array of usernames to search for
        var userIds = [];
        var newValue = [];
        console.log('insert')
            // console.log(logObject)

        logObject = {
                "user_name": body.name,
                "email_id": body.email,
                "mobile": body.phone,
                "program": body.program,
                "submission_dt": new Date(),
                //   "token": randomstring.generate(7) //added token field. 14Mar2017

            }
            //insert the user details who have enquired details
        LinkdIn.create(logObject).exec(function(err, record) {
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