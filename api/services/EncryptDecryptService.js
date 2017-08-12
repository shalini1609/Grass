/**
 * EncryptDecrypt.js
 *
 * @description 	 :: Encryption & Decryption Service
 * @created          :: Ajeet
 * @Created  Date    :: 17/10/2016
 * @lastEdited       :: 
 * @lastEdited Date  :: 
 *
 */
 
"use strict";

var crypto = require('crypto');

module.exports = {

	//key: "Sample key", 

	encrypt: function(plainTextData) {
		//console.log("key encrypt",ServConfigService.getEncryptDecryptKey());
	    var cipher = crypto.createCipher('aes256', ServConfigService.getEncryptDecryptKey());  
	    var encrypted = cipher.update(plainTextData, 'utf-8', 'hex');
	  
	    encrypted += cipher.final('hex');	   

	    return encrypted;
	},

	decrypt: function(encryptedData) {

	    var decipher = crypto.createDecipher('aes256',ServConfigService.getEncryptDecryptKey());
	   
	    var decrypted = decipher.update(encryptedData, 'hex', 'utf-8'); 		

	    decrypted += decipher.final('utf-8');	    

	    return decrypted;
	}
};