/**
 * Created by stan on 7/21/17.
 */
module.exports = function (app) {

    var connectionString = 'mongodb://127.0.0.1:27017/webdev'; // for local
    if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
        var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
        var password = process.env.MLAB_PASSWORD_WEBDEV;
        connectionString = 'mongodb://' + username + ':' + password;
        connectionString += '@ds113660.mlab.com:13660/heroku_crdfq571'; // user yours
    }

    var mongoose = require("mongoose");
    mongoose.connect(connectionString);
    mongoose.Promise = require('q').Promise;

    var userModel = require('./user/user.model.server')(mongoose);
    var websiteModel = require("./website/website.model.server")(mongoose, userModel);
    var pageModel =  require("./page/page.model.server.js")(mongoose, websiteModel);
    var widgetModel = require("./widget/widget.model.server.js")(mongoose, pageModel);

    var models = {
        'userModel' : userModel,
        'websiteModel' : websiteModel,
        'pageModel' : pageModel,
        'widgetModel' : widgetModel
    };

    return models;
};

console.log("models.server js is running");