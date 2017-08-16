module.exports = function(mongoose, websiteModel){
    var pageSchema = require('./page.schema.server.js')(mongoose);
    var pageModel = mongoose.model('pageModel', pageSchema);

    var api = {
        'createPage' : createPage,
        'findAllPagesForWebsite' : findAllPagesForWebsite,
        'findPageById' : findPageById,
        'updatePage' : updatePage,
        'addWidgetToPage' : addWidgetToPage,
        'removeWidgetFromPage' : removeWidgetFromPage,
        'deletePage' : deletePage
    };

    return api;

    function createPage(websiteId, page) {
        page._id = new Date().getTime().toString();
        page._website = websiteId;
        return pageModel
            .create(page)
            .then(
                function (page) {
                    return websiteModel
                        .addPageToWebsite(websiteId, page._id);
                });
    }

    function findAllPagesForWebsite(websiteId) {
        return pageModel
            .find({_website : websiteId})
            .populate('_website')
            .exec();
    }

    function findPageById(pageId) {
        return pageModel.findById(pageId);
    }

    function updatePage(pageId, page) {
        return pageModel.update({
            _id : pageId
        }, {
            name : page.name,
            description : page.description
        });
    }

    function addWidgetToPage(pageId, widgetId) {
        return pageModel
            .findOne({_id: pageId})
            .then(
                function (page) {
                    page.widgets.push(widgetId);
                    return page.save();
                });
    }

    function removeWidgetFromPage(pageId, widgetId) {
        return pageModel
            .findById(pageId)
            .then(
                function (page) {
                    page.widgets.pull(widgetId);
                    page.save();
                });
    }

    function deletePage(pageId) {
        return pageModel
            .findById(pageId)
            .then(function (page) {
                var websiteId = page._website;
                return websiteModel
                    .removePageFromWebsite(websiteId, pageId)
                    .then(function (website) {
                        return pageModel
                            .remove({_id: pageId});
                    });
            });
    }
};