/**
 * JWT
 * @description    :: Configuration file for the enrichothers.credentials.api service
 * @created          :: Chetan
 * @Created  Date    :: 17/10/2016
 * @lastEdited       :: Chetan
 * @lastEdited Date  :: 17/10/2016
 */

"use strict";

module.exports = {

    // Object which holds Application Configurations loaded from database
    applicationConfig: {},

    /**
     * Method:     loadApplicationConfig
     * Description:  Initiates application configuration loading
     *
     */
    loadApplicationConfig: function(callBack) {
        // Call to ApplicationConfig model's method
        ApplicationConfig.getApplicationConfigDetails(this.setApplicationConfig, callBack);
    },


    /**
     * Method:     setApplicationConfig
     * Description:  responsible for setting value to applicationConfig, and returning the result as true/false from callback
     *
     */
    setApplicationConfig: function(appConfig, callBack) {
        if (appConfig) {
            this.applicationConfig = appConfig;
            sails.log.info("ServConfigService > setApplicationConfig > Application Configurations loaded sucessfully!");
            callBack(true);
        } else {
            sails.log.error("ServConfigService > setApplicationConfig > Could not get Application Configurations.");
            callBack(false);
        }
    },

    /**
     * Method:     getApplicationConfig
     * Description:  to get entire applicationConfig object
     *
     */
    getApplicationConfig: function() {
        return this.applicationConfig;
    },

    /**
     * Method:     getApplicationConfig
     * Description:  to get api_details object form applicationConfig object
     *
     */
    getApplicationAPIs: function() {
        return this.applicationConfig.api_details;
    },

    /**
     *  Method:     getJwtSecretToken
     *  Description:  to get Jwt secret Token object form applicationConfig object
     *
     */
    getJwtSecretToken: function() {
        return this.applicationConfig.tokenSecret;
    },
    /**
     *  Method:     getHashSecretKey
     *  Description:  to get Hash secret key Token object form applicationConfig object
     *
     */
    getHashSecretKey: function() {
        return this.applicationConfig.hashSecretKey;
    },

    /**
     *    Method:         getEncryptDecryptKey
     *    Description:    to get getEncryotDecryp key Token object form applicationConfig object
     *
     */
    getEncryptDecryptKey: function() {
        return this.applicationConfig.encryptDecryptKey;
    }

};