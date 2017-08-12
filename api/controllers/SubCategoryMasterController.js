/**
 * SubCategoryMasterController
 *
 * @description :: Server-side logic for managing Subcategorymasters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 * @createdBy   :: Suraksha
 * @created Dat :: 05-Jul-2017
 */

module.exports = {
    //Function to get all existing sub category details.
    getSubCategoryDetails: function(req, res) {

        var requestApi = req.baseUrl + req.path;
        var token = req.token;
        SubCategoryMaster.getSubCategoryDetails(req.body, requestApi, token, function(response) {
            res.json(response);;
        });
    }
};