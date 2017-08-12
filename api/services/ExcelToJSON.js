/**
 * ExcelToJSON.js
 *
 * @description :: TODO: This module will convert Excel file to JSON array of objects
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 * @createdBy       :: Ajeet
 * @created Date    :: 1-02-2017
 */

var node_xj = require("xls-to-json");   // node module to convert Excel to JSON


module.exports = {

	/*
	# Method: convertExcel2JSON
	# Description: to convert excel file To JSON
	# Input: Excel file Path
	# Output : response with success or error
  	*/ 

  	convertExcel2JSON:function(path,token,next){

  		// default response object
        var responseObj = {
            statusCode:-1,
            message:null,
            result:null
        };

        // convert the excel file to JSON
  		node_xj({
		    input: path,  // input xls
		    output: "output.json" // output json
		    //sheet: "survey"  // specific sheetname
		},
		function(err, result) {
		    if(err) {
		      	console.error(err);
		      	responseObj.message = err;
		      	next(responseObj);
		    } 
		    else {
			  	//console.log("result aa gaya:", result)
			   	responseObj.statusCode = 0;
			   	responseObj.result = result;
			   	next(responseObj);
		    }	
		});		// end of excel to json

  	}

}  	