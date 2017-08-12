
/**
 * LogService
 * @description      :: LogService to track all user activity and data logs
 * @created          :: Swati
 * @Created  Date    :: 10/01/2017
 */
var request = require('request');
module.exports = {
	/**
   	*  Method    :: addUserLog
   	*  Description :: Function defined to call LogService to add activity to UserLog collection
   	*
   	*/
	addUserLog:function(logObject,token){
		console.log("Adding User Log");
		//console.log("logObject",logObject);
		var apiURL = ServConfigService.getApplicationConfig().base_url
					 + ":"
					 + ServConfigService.getApplicationAPIs().addUserLog.port
					 + ServConfigService.getApplicationAPIs().addUserLog.url

		var requestOptions = {
			  url: apiURL,
			  method: ServConfigService.getApplicationAPIs().addUserLog.method,
			  headers: {
			    'authorization' : 'Bearer ' + token
			  },
			  json:logObject
		};
		//console.log(requestOptions);
		request(requestOptions,function (error, response, body){
			//console.log("responseObject",error + " " + response +" "+body.statusCode);
			if (!error && body.statusCode === 0){
				console.log("User Log inserted successfully");
			}else{
				console.log("Add User Log Failure");
			}
		})
	},

	/**
   	*  Method    :: addDataLog
   	*  Description :: Function defined to call LogService to add activity to DataLog collection
   	*
   	*/
	addDataLog:function(logObject,token){
		/*console.log("called data log  function");
		console.log("roleObject",logObject);*/
		var apiURL = ServConfigService.getApplicationConfig().base_url
					 + ":"
					 + ServConfigService.getApplicationAPIs().addDataLog.port
					 + ServConfigService.getApplicationAPIs().addDataLog.url

		var requestOptions = {
			  url: apiURL, //ServConfigService.getUserPersonalDetailsAPI.url+"?userId="+foundCredentials.userId,
			  method: ServConfigService.getApplicationAPIs().addDataLog.method,
			  headers: {
			    'authorization' : 'Bearer ' + token
			  },
			  json:logObject
		};

		request(requestOptions,function (error, response, body){
			if (!error && body.statusCode === 0){
				console.log("DataLog inserted successfully");
			}else{
				console.log("add DataLog failure");
			}
		})
	},


	/**
   	*  Method    :: addRollbackErrorLog
   	*  Description :: Function defined to add rollback error log
   	*
   	*/
	addRollbackErrorLog:function(logObject,token){
		/*console.log("called data log  function");
		console.log("roleObject",logObject);*/
		var apiURL = ServConfigService.getApplicationConfig().base_url
					 + ":"
					 + ServConfigService.getApplicationAPIs().addDataLog.port
					 + ServConfigService.getApplicationAPIs().addDataLog.url

		var requestOptions = {
			  url: apiURL, //ServConfigService.getUserPersonalDetailsAPI.url+"?userId="+foundCredentials.userId,
			  method: ServConfigService.getApplicationAPIs().addDataLog.method,
			  headers: {
			    'authorization' : 'Bearer ' + token
			  },
			  json:logObject
		};

		request(requestOptions,function (error, response, body){
			if (!error && body.statusCode === 0){
				console.log("rollback error log inserted successfully");
			}else{
				console.log("rollback error log failure");
			}
		})
	}

};