/**
 * CategoryMasterController
 *
 * @description :: Server-side logic for managing Categorymasters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 * @createdBy    :: Suraksha
 * @created Date :: 05-Jul-2017
 */

module.exports = {
    // Function to get all the existing Categories
    getCategoryDetails: function(req, res) {

        var requestApi = req.baseUrl + req.path;
        var token = req.token;
        var result = [];
        CategoryMaster.getCategoryDetails(req.body, requestApi, token, function(response) {

            result.push(response)
            res.json(response);

        });
    },

    //Function to search product wise
    getCategory: function(req, res) {

        var requestApi = req.baseUrl + req.path;
        var token = req.token;
        CategoryMaster.getCategory(req, requestApi, token, function(response) {
            res.json(response);
        });
    }
};