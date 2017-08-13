module.exports = function(app, models){

    var websites = [
        {_id: "123", name: "Facebook", developerId: "456", description: "Test01"},
        {_id: "234", name: "Tweeter", developerId: "456", description: "Test02"},
        {_id: "456", name: "Gizmodo", developerId: "456", description: "Test03"},
        {_id: "567", name: "Tic Tac Toe", developerId: "123", description: "Test04"},
        {_id: "678", name: "Checkers", developerId: "123", description: "Test05"},
        {_id: "789", name: "Chess", developerId: "234", description: "Test06"}
    ];

    //POST Calls
    app.post('/api/user/:userId/website',createWebsite);

    //GET Calls
    app.get('/api/user/:userId/website',findWebsitesByUser);

    app.get('/api/website/:websiteId',findWebsiteById);

    //PUT Calls
    app.put('/api/website/:websiteId',updateWebsite);

    //DELETE Calls
    app.delete('/api/website/:websiteId',deleteWebsite);

    //HELPER functions
    function getNextID() {
        function getMaxId(maxId, currentId) {
            var current = parseInt(currentId._id);
            if (maxId > current) {
                return maxId;
            } else {
                return current + 1;
            }
        }
        return websites.reduce(getMaxId, 0).toString();
    }

    /*API calls implementation*/
    function createWebsite(req, res) {
        var userId = req.params.userId;
        var website = req.body;

        var newWebsite = {
            _id: getNextID(),
            name: website.name,
            description: website.description,
            developerId: userId
        };
        websites.push(newWebsite);

        res.sendStatus(200);
    }

    function findWebsitesByUser(req, res) {
        var userId = req.params.userId;
        var results = websites.filter(function (website) {
            return parseInt(website.developerId) === parseInt(userId)
        });
        res.send(results);
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        var website = websites.find(function (website) {
            return parseInt(website._id) === parseInt(websiteId)
        });
        res.send(website);
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var website = req.body;

        for (var i = 0; i < websites.length; i++) {
            if (parseInt(websites[i]._id) === parseInt(websiteId)) {
                websites[i].name = website.name;
                websites[i].description = website.description;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        for (var i = 0; i < websites.length; i++) {
            if (parseInt(websites[i]._id) === parseInt(websiteId)) {
                websites.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
};