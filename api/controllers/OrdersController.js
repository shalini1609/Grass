/**
 * OrdersController
 *
 * @description :: Server-side logic for managing orders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    addOrders: function(req, res) {
        var token = req.authorization;
        // token = 'Bearer ' + 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkFVMTQ5NDA3NjEwMjcyNCIsImlhdCI6MTQ5NDk5OTMzNH0.LRScgf-UX1wAY5SLTsMqK80ou04Ho1oZ1RpFkDpyP313g3ZvonSfmX1OYcDOsOi1Bs4XnO34tg3QAzn5gG46Sg'

        //Variable defined to create userLogObject
        var recordInfo = req.body.recordInfo;
        var userLogObject = req.body.frontendUserInfo;
        // userLogObject.requestApi = req.baseUrl + req.path;
        // userLogObject.event = "Add Orders";
        // userLogObject.eventType = "Add";
        var responseObj = {};
        var query = recordInfo.productDetails[0].referermobile;
        console.log(query)
        BusinessEntityUserMaster.getEntityDetails(query,
            function(result) {
                console.log(result.length)
                if (result.length > 0) {
                    var businessId = result[0].businessId[0]

                    console.log(businessId)
                    Orders.addOrders(recordInfo, userLogObject, businessId, token, function(response) {
                        //  res.json(result);
                        console.log(response)
                        var programInfo = {};
                        var reqObj = {}
                        var purchaseDetails = [];
                        var obj;
                        for (var i = 0; i < response.length; i++) {


                            obj = {
                                "productId": response[i].productId,
                                "productName": response[i].productName,
                                "packagingUnitId": "GRASS",
                                "packagingUnit": "SKU",
                                "quantity": response[i].productQuantity,
                                "MRP": response[i].pointsPerQuantity,
                                "discount": 0,
                                "totalPrice": response[i].totalPoints
                            }
                            purchaseDetails.push(obj)
                        }
                        //console.log(JSON.stringify(purchaseDetails))
                        reqObj = {
                            "recordInfo": {
                                "purchaseDetails": purchaseDetails,
                                "creditPartyId": 'BE1500988068759', //"BE1498548448125",
                                "debitPartyId": businessId, //"BE1500988068759",
                                "invoiceNumber": response[0].cartId,
                                "invoiceAmount": response[0].invoiceTotal,
                                "invoiceAmountExcludingVAT": response[0].invoiceTotal,
                                "transactionDate": new Date(),
                                "vatPercentage": "0",
                                "invoiceDocument": "https://phoenix2-content-files.s3.ap-south-1.amazonaws.com/Operations-Data/invoiceUpload1500989080430.jpg"
                            },
                            "uploadedFrom": "adminApp",
                            "programId": "PR1498035372717",
                            "clientId": "CL1496149805465",
                            "frontendUserInfo": { "appType": "Grass Apparels" },
                            "serviceType": "programOperations",
                            "parentUsers": ["BE1498036223421"]
                        }

                        console.log("coming");

                        SecondarySales.addSecondarySale(reqObj, programInfo, token, userLogObject,
                            function(response) {
                                res.json(response);
                            });


                        //else
                    });
                } else {
                    responseObj.statusCode = 2;
                    responseObj.message = "Referer does not exists !!";
                    res.json(responseObj);
                }
            });
    }
};