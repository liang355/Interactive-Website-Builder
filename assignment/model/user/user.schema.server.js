module.exports = function(mongoose){
    var websiteSchema = require("../website/website.schema.server.js")(mongoose);
    var Schema = mongoose.Schema;

    var userSchema = new Schema({
        _id: String,
        username : {type : String, required : true},
        password : {type : String, required : true},
        firstName : String,
        lastName : String,
        email : String,
        websites : [{
            type: String,
            ref : 'websiteModel'
        }],
        dateCreated : {
            type : Date,
            default: Date.now
        }
    }, {collection: 'user'});

    return userSchema;
};