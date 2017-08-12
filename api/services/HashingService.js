/**
 * HashingService.js
 *
 * @description 	 :: Hashing Service
 * @created          :: Chetan
 * @Created  Date    :: 17/10/2016
 * @lastEdited       :: Chetan
 * @lastEdited Date  :: 17/10/2016
 *
 */

"use strict";

const crypto = require('crypto');

module.exports = {

	//TODO: Finalize the secrete key to use
	//var secret =  "abcdef", // Secrete

	getHashCode: function(data){

		var secret =  "abcdef";
		var hashCode = "";
		//var hmac = crypto.createHmac('sha512',ServConfigService.getHashSecretKey()); // HMAC: Hash-based message authentication code
		var hmac = crypto.createHmac('sha512',secret);

        hmac.update(data);
       	hashCode = hmac.digest('hex');

		return hashCode;
	}
};