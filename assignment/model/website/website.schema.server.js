module.exports = function (mongoose) {
    var pageSchema = require("../page/page.schema.server.js")(mongoose);
    var Schema = mongoose.Schema;

    var websiteSchema = new Schema({
        _id: String,
        _user : {type : Schema.Types.ObjectId, ref : 'userModel'},
        name : {type : String, required : true},
        description : String,
        pages : [{
            type : Schema.Types.ObjectId,
            ref : 'pageModel'
        }],
        dateCreated : {
            type : Date,
            default: Date.now
        }
    }, {collection : 'website'});

    return websiteSchema;
};