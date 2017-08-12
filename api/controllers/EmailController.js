/**
 * EmailController
 *
 * @description :: Server-side logic for managing Emails
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 * @createdBy   :: Suraksha
 * @created Date :: 05-Jul-2017
 */

module.exports = {

    // Function to send emails to customerfirst@grassapparels.in
    sendEmail: function(req, res) {
        var token = req.token;

        var communicationLogInfo = req.body.communicationLogInfo //requestObject to store communicationLogs
        console.log(communicationLogInfo)
        Email.sendEmail(req.body, token, function(response) {

            // for (var i = 0; i < communicationLogInfo.length; i++) {
            //     communicationLogInfo[i].successStatus = response.statusCode;
            //     communicationLogInfo[i].response = response;
            // }
            //variable defined to send communicationObject
            var communicationLogObject = {};

            //  communicationLogObject.logType = "Email";




            communicationLogInfo = {

                    "keycontacts": [{
                        "name": communicationLogInfo[0].ownername,

                        "contact": communicationLogInfo[0].mobileNumber,
                        "email": communicationLogInfo[0].email
                    }],

                    "createdby": {
                        "name": communicationLogInfo[0].ownername,

                        "contact": communicationLogInfo[0].mobileNumber,
                        "email": communicationLogInfo[0].email
                    },
                    "createdate": new Date(),

                    "estimation": [{
                        "sku": communicationLogInfo[0].prodCode,
                        "quantity": communicationLogInfo[0].qty,
                        "unit": "No",
                        "dealer": {

                            "name": "Annectos",
                        }
                    }],
                    "projectname": communicationLogInfo[0].projectname,



                    "remarks": communicationLogInfo[0].remarks

                } //communicationLogInfo[0];


            //Adds the user details who have enquired
            EmailEnquiry.addCommunicationLog(communicationLogInfo, token);
            res.json(response);
        });

    },

    sendEmailLinkdn: function(req, res) {
        var token = req.token;

        var communicationLogInfo = req.body.communicationLogInfo //requestObject to store communicationLogs
        console.log(req.body);
        var resObj = {};
        if (req.body.program == 'Grassapparels') {

            sub = "Grass Email Submission";
        } else {
            sub = "Annectos Email Submission";
        }


        resObj = {
            "from": 'info@annectos.in',
            // "to": 'suraksha@annectos.net',
            to: 'sharvani@annectos.in,lalit@annectos.in',
            "subject": sub,
            "text": 'You have recieved new enquiry from: "' + req.body.name + '"; Mobile Number: ' + req.body.phone + '; Email Id: ' + req.body.email,
            "communicationLogInfo": [{
                "communicationType": "EMAIL",
                "sendTo": "customerfirst@grassapparels.in"

            }]
        }
        Email.sendEmail(resObj, token, function(response) {


            var communicationLogObject = {};

            //  communicationLogObject.logType = "Email";





            //Adds the user details who have enquired
            LinkdIn.addLogs(req.body, token);
            res.json(response);
        });

    }

};