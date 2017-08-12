/**
 * ApplicationConfig.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

"use strict";

module.exports = {

    tableName: 'ApplicationConfig',
    attributes: {},

    /**
     *	Method		:: getApplicationConfigDetails
     *	Description :: used to retrieve Application Configurations
     *
     */
    getApplicationConfigDetails: function(setAppConfigCallback, passOnCallbak) {
        var appConfig;

        // Retrieve Application Configuration
        ApplicationConfig.find().limit(1)
            .exec(function(err, result) {
                if (result.length) {

                    appConfig = result[0];
                    setAppConfigCallback(appConfig, passOnCallbak);
                } else if (!err) {

                    appConfig = false;
                    sails.log.error("ApplicationConfig model > getApplicationConfigDetails > ApplicationConfig.find > ", result);
                    setAppConfigCallback(appConfig, passOnCallbak);

                } else {

                    appConfig = false;
                    sails.log.error("ApplicationConfig model > getApplicationConfigDetails > ApplicationConfig.find > ", err);
                    setAppConfigCallback(appConfig, passOnCallbak);

                }
            });
    }
};