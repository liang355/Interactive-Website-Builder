module.exports = function(mongoose, userModel) {
    var websiteSchema = require('./website.schema.server.js')(mongoose);
    var websiteModel = mongoose.model('websiteModel', websiteSchema);

    var api = {
        'createWebsiteForUser' : createWebsiteForUser,
        'findAllWebsites' : findAllWebsites,
        'findAllWebsitesForUser' : findAllWebsiteForUser,
        'findWebsiteById' : findWebsiteById,
        'updateWebsite' : updateWebsite,
        'addPageToWebsite' : addPageToWebsite,
        'removePageFromWebsite' : removePageFromWebsite,
        'deleteWebsite' : deleteWebsite
     };
     return api;

    function createWebsiteForUser(userId, website) {
        website._user = userId;
        return websiteModel
            .create(website)
            .then(
                function (website) {
                    return userModel
                        .addWebsiteForUser(userId, website._id);
                });
    }

    function findAllWebsites() {
        return websiteModel.find();
    }

    function findAllWebsiteForUser(userId) {
        return websites = websiteModel
            .find({_user : userId})
            .populate('_user')
            .exec();
    }

    function findWebsiteById(websiteId) {
        return websiteModel.findOne({_id: websiteId});
    }

    function updateWebsite(websiteId, website) {
        return websiteModel.update({
            _id : websiteId
        }, {
            name : website.name,
            description : website.description
        });
    }

    function addPageToWebsite(websiteId, pageId) {
        return websiteModel
            .findOne({_id: websiteId})
            .then(
                function (website) {
                    website.pages.push(pageId);
                    return website.save();
                });
    }

    function removePageFromWebsite(websiteId, pageId) {
        websiteModel
            .findOne({_id: websiteId})
            .then(
                function (website) {
                    website.pages.pull(pageId);
                    website.save();
                },
                function (error) {
                    console.log(error);
                }
            );
    }

    function deleteWebsite(websiteId) {
        var userId = websiteModel.findOne({_id: websiteId})._user;

        return websiteModel.remove({
            _id: websiteId
        });
    }
};