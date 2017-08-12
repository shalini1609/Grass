/**
 * ProductMasterController
 *
 * @description :: Server-side logic for managing productmasters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 * @createdBy   :: Suraksha
 * @created Date :: 05-Jul-2017
 */

module.exports = {

    // Function to get all the product details
    getProductDetails: function(req, res) {
        var token = req.token;
        var requestApi = req.baseUrl + req.path;
        console.log(token)
        ProductMaster.getProductDetails(req.body, requestApi, token, function(response) {
            res.json(response);;
        });
    },
    // Function to get product details based on filters applied.


    getFilterProductDetails: function(req, res) {

        var requestApi = req.baseUrl + req.path;
        var token = req.token;
        ProductMaster.getFilterProductDetails(req.body, requestApi, token, function(response) {
            res.json(response);;
        });
    },
    getMoreFilterProductDetails: function(req, res) {

        var requestApi = req.baseUrl + req.path;
        var token = req.token;
        var a = req.body.cat;
        //if (a.includes(',')) {
        ProductMaster.getMoreFilterProductDetails(req.body, requestApi, token, function(response) {
            res.json(response);
        });


        // } else {
        //     // Function to get product details based on multiple filters applied.
        //     ProductMaster.getFilterProductDetails(req.body, requestApi, token, function(response) {
        //         res.json(response);
        //     });
        // }

    },

    //Function to search product wise
    getProductBasedSearch: function(req, res) {

        var requestApi = req.baseUrl + req.path;
        var token = req.token;
        ProductMaster.getProductBasedSearch(req, requestApi, token, function(response) {
            res.json(response);
        });
    },





};