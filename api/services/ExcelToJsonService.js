/**
 * LogService
 * @description      :: S3 file service to copy file on local machine, convert excel data to json and delete file from local machine
 * @created          :: Swati
 * @Created  Date    :: 25/02/2017
 */

"use strict";
var node_xj = require("xls-to-json");
var AWS = require('aws-sdk');
var fs = require('fs');

module.exports = {

	convertExcelToJson:function(requestObject,next){
        console.log("Inside service");
		//object to send response
        var responseObj = {
            "statusCode":-1,
            "message":null
        }   
        //s3 credential to get access 
        AWS.config.update(
            {
                accessKeyId: "AKIAJNALBLLSQ7CIWLKQ",
                secretAccessKey: "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",
            }
        );
        var templateFile = [];
        templateFile = requestObject.template.split('/');   //split file path to access only file name
        var excelFileName = templateFile[templateFile.length-1];   //accessing excel file name from path
        var file = fs.createWriteStream('excelsheet/'+ templateFile); //variable defined to create file on directory
        var s3 = new AWS.S3({signatureVersion:'v4'});
        //object defined to get name of bucket and file
        var s3Params = {		
            Bucket: 'phoenix2-content-files', //name of the bucket
            Key: requestObject.template     //File path of template uploaded on s3
        };
        var stream = s3.getObject(s3Params).createReadStream().pipe(file);//stream object to copy file content from s3 to local machine
        stream.on('finish',function f(err,data){
            if(err){
                responseObj.message = err;
                next(responseObj);
            }
            else{
            	//converting excel data to json
                node_xj({
                    input: 'excelsheet/'+ templateFile ,
                    //input: 'BusinssEntity.xlsx',
                    output: "output.json" // output json
                },function(err,result){
                    if(err){
                        responseObj.message = err;
                    }
                    else{
                        //console.log("results",result);
                        responseObj.statusCode = 0;
                        responseObj.message = "Record fetched successfully!!"
                        responseObj.result = result;
                        //fs.unlink('excelsheet/'+templateFile); //after conversion deleting file form local machine
                    }
                    next(responseObj);
                })
            }
        })
    }

};