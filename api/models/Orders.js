/**
 * Orders.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    tableName: "grassOrders",
    connection: 'someMongodbServer',
    attributes: {

    },



    addOrders: function(reqBody, userLogObject, businessId, token, next) {

        //default object to send response 
        var responseObj = {
            "statusCode": -1,
            "message": null
        }

        //variables declared
        var clientId = reqBody.clientId;
        var programId = reqBody.programId;
        var customerId = reqBody.customerId;
        var productDetails = reqBody.productDetails; //array of products(can be multiple products)
        var i;
        //var totalPoints = reqBody.totalPoints;
        var ordersArray = []; //default array to push all order details
        var results; //store reults of orders created
        var ledgerArray = [] //Array of ledgerRecords for every orders
        var creditLedgerInfo; //store info of ledgerRecord added
        var ledgerIds = []; //array of ledgerId
        var orderIds = []; //array of orderId;
        var debitedProgramPointsInfo //Program info stored after debiting points from program
        var billingAddress = {};

        /*Variables defined to perform revertback operation*/
        var revertAddedOrders = false;
        var revertCreditEntry = false;
        var revertDebitEntry = false;
        var revertProgramPoints = false;

        var rollbackSuccessStatus = true;
        var rollbackFailureMessage = "";

        /*Request Object defined for perfoming service call*/
        var validateUserReqObject;
        var ledgerReqObject;
        var debitUserReqObject;
        var customerInfo;
        var progUserInfo = {};
        var deleteLedgerReqObject = {};

        var orderObject = { //store default order object for every product
            clientId: clientId,
            cartId: 'CAR' + Date.now(),
            programId: programId,
            customerId: customerId,
            customerName: reqBody.customerName,
            shippingAddress: reqBody.shippingAddress,
            billingAddress: reqBody.billingAddress,
            orderStatus: reqBody.orderStatus,
            invoiceTotal: reqBody.invoiceTotal,

            orderDate: new Date(),

        }

        //object defined to validate customer
        validateUserReqObject = {
            clientId: clientId,
            programId: programId,
            programUserId: customerId,
            frontendUserInfo: userLogObject,
            serviceType: "programSetup"
        }

        //object defined to add ledger record
        ledgerReqObject = {
            clientId: clientId,
            programId: programId,
            transactionType: "Orders"
        }

        //object defined to deduct points from programUser table
        debitUserReqObject = {
            clientId: clientId,
            programId: programId,
            programUserId: customerId,
            frontendUserInfo: userLogObject,
            serviceType: "programSetup"
        }

        //perform async function to validate function
        async.series([

            /***VALIDATE USER AND POINTS EARNED****/


            /***ADD RECORDS FOR ORDERS IN ORDER TABLE****/
            function(callback) {

                // billingAddress.state = customerInfo.userDetails.state;
                // billingAddress.city = customerInfo.userDetails.city;
                // billingAddress.streetAddress = customerInfo.userDetails.streetAddress;
                // billingAddress.pincode = customerInfo.userDetails.pincode;
                // billingAddress.mobileNumber = customerInfo.userDetails.mobileNumber;

                // orderObject.billingAddress = billingAddress;

                for (i = 0; i < productDetails.length; i++) {

                    //  if (productDetails[i].productQuantity > 1) {
                    var a = 0;
                    var productQuantity = productDetails[i].productQuantity;
                    var tempObject = JSON.parse(JSON.stringify(orderObject));
                    tempObject.orderId = 'OR' + Date.now() + i + a;
                    tempObject.productId = productDetails[i].productId;
                    tempObject.pointsPerQuantity = productDetails[i].pointsPerQuantity;
                    tempObject.productQuantity = productQuantity;
                    tempObject.totalPoints = productDetails[i].pointsPerQuantity * productQuantity;;

                    tempObject.refererMobile = productDetails[i].referermobile;
                    ordersArray.push(tempObject);
                    // for (var a = 0; a < productQuantity; a++) {
                    //     var tempObject = JSON.parse(JSON.stringify(orderObject));
                    //     tempObject.orderId = 'OR' + Date.now() + i + a;
                    //     tempObject.productId = productDetails[i].productId;
                    //     tempObject.pointsPerQuantity = productDetails[i].pointsPerQuantity;
                    //     tempObject.productQuantity = productQuantity;
                    //     ordersArray.push(tempObject);
                    // }
                    // } else {
                    //     console.log("Inside else")
                    //     var tempObject = JSON.parse(JSON.stringify(orderObject));
                    //     tempObject.orderId = 'OR' + Date.now() + i;
                    //     tempObject.productId = productDetails[i].productId;
                    //     tempObject.pointsPerQuantity = productDetails[i].pointsPerQuantity;
                    //     tempObject.productQuantity = productQuantity;
                    //     ordersArray.push(tempObject);
                    // }
                } //end of for loop

                Orders.create(ordersArray).exec(function f(err, createdRecords) {
                    console.log("comming")
                        //  console.log(createdRecords)
                    if (err) {
                        responseObj.message = err;
                        callback("F2 failed", "Error Occurred");
                    } else if (!createdRecords) {
                        responseObj.statusCode = 2;
                        responseObj.message = "Failed to create records";
                        callback("F2 failed", "Error Occurred");
                    } else if (createdRecords.length === 0) {
                        responseObj.statusCode = 2;
                        responseObj.message = "Failed to create records";
                        callback("F2 failed", "Error Occurred");
                    } else {
                        console.log("11111")
                        responseObj.statusCode = 0;
                        responseObj.message = "Records created successfully !!";
                        results = createdRecords;

                        for (i = 0; i < results.length; i++) {
                            orderIds.push(results[i].orderId);
                        }
                        console.log(results)
                        callback(null, "Success");
                    }
                    console.log(responseObj)
                    next(results);
                })

            }
        ])


    }

};