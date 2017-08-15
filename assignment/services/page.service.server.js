module.exports = function(app, models) {
    var model = models.pageModel;
    var pages = [
        { _id: "321", name: "GizPost 1", websiteId: "456", description: "Lorem" },
        { _id: "432", name: "GizPost 2", websiteId: "456", description: "Lorem" },
        { _id: "543", name: "GizPost 3", websiteId: "456", description: "Lorem" }
    ];

    //POST Calls
    app.post('/api/website/:websiteId/page',createPage);

    //GET Calls
    app.get('/api/website/:websiteId/page',findPagesByWebsiteId);

    app.get('/api/page/:pageId',findPageById);

    //PUT Calls
    app.put('/api/page/:pageId',updatePage);

    //DELETE Calls
    app.delete('/api/page/:pageId',deletePage);

    //HELPER functions
    // function getNextID() {
    //     function getMaxId(maxId, currentId) {
    //         var current = parseInt(currentId._id);
    //         if (maxId > current) {
    //             return maxId;
    //         } else {
    //             return current + 1;
    //         }
    //     }
    //     return pages.reduce(getMaxId, 0).toString();
    // }

    /*API calls implementation*/
    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;

        var newPage = {
            _id: getNextID(),
            name: page.name,
            websiteId: websiteId,
            description: page.description
        };
        pages.push(newPage);
        res.send(newPage);
    }

    function findPagesByWebsiteId(req, res) {
        var websiteId = req.params.websiteId;
        model
            .findAllPagesForWebsite(websiteId)
            .then(function (pages) {
                res.send(pages);
            }, function (error) {
                res.sendStatus(500).send(error);
            })
        // var results = pages.filter(function (page) {
        //     return page.websiteId === websiteId
        // });
        // res.send(results);
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        var result = pages.find(function (page) {
            return page._id === pageId;
        });
        res.send(result);
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var newPage = req.body;
        console.log(newPage);
        for(var i = 0; i < pages.length; i ++) {
            if (pages[i]._id === pageId) {
                pages[i].name = newPage.name;
                pages[i].description = newPage.description;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        for(var i = 0; i < pages.length; i ++) {
            if (pages[i]._id === pageId) {
                pages.splice(i,1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
};