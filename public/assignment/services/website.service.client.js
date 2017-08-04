(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", websiteService);

    function websiteService() {
        var websites = [
            { _id: "123", name: "Facebook",    developerId: "456", description: "Lorem" },
            { _id: "234", name: "Tweeter",     developerId: "456", description: "Lorem" },
            { _id: "456", name: "Gizmodo",     developerId: "456", description: "Lorem" },
            { _id: "890", name: "Go",          developerId: "123", description: "Lorem" },
            { _id: "567", name: "Tic Tac Toe", developerId: "123", description: "Lorem" },
            { _id: "678", name: "Checkers",    developerId: "123", description: "Lorem" },
            { _id: "789", name: "Chess",       developerId: "234", description: "Lorem" }
        ];
        var services = {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        };
        return services;

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

        function createWebsite(userId, website) {
            var newWebsiteID = getNextID();
            var newWebsite = {
                _id: newWebsiteID,
                name: website.name,
                description: website.description,
                developerId: userId
            };
            websites.push(newWebsite);
        }
        
        function findWebsitesByUser(userId) {
            var result = [];
            for (var i = 0; i < websites.length; i++) {
                var website = websites[i];
                if (parseInt(website.developerId) === parseInt(userId)) {
                    result.push(website);
                }
            }
            return result;
        }
        
        function findWebsiteById(websiteId) {
            for (var i = 0; i < websites.length; i++) {
                var website = websites[i];
                if (parseInt(website._id) === parseInt(websiteId)) {
                    return website;
                }
            }
            return null;
        }

        function updateWebsite(websiteId, website) {
            var oldWebsite = findWebsiteById(websiteId);
            var index = websites.indexOf(oldWebsite);
            websites[index].name = website.name;
            websites[index].developerId = website.developerId;
            websites[index].description = website.description;
        }

        function deleteWebsite(websiteId) {
            var oldWebsite = findWebsiteById(websiteId);
            var index = websites.indexOf(oldWebsite);
            websites.splice(index, 1);
        }
    }
})();