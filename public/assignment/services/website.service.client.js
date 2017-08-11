(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", websiteService);

    function websiteService($http) {
        var services = {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        };
        return services;

        function createWebsite(userId, website) {
            var url = "/api/user/"+userId+"/website";
            return $http.post(url, website);
        }

        function findWebsitesByUser(userId) {
            var url = "/api/user/"+ userId +"/website";
            return $http.get(url);
        }

        function findWebsiteById(websiteId) {
            var url = "/api/website/"+ websiteId;
            return $http.get(url);
        }

        function updateWebsite(websiteId, website) {
            var url = "/api/website/"+ websiteId;
            return $http.put(url, website);
        }

        function deleteWebsite(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.delete(url);
        }

        function deleteWebsitesByUser(userId) {
            var url = "/api/user/" + userId + "/website";
            return $http.delete(url);
        }

        // function getNextID() {
        //     function getMaxId(maxId, currentId) {
        //         var current = parseInt(currentId._id);
        //         if (maxId > current) {
        //             return maxId;
        //         } else {
        //             return current + 1;
        //         }
        //     }
        //     return websites.reduce(getMaxId, 0).toString();
        // }
        //
        // function createWebsite(userId, website) {
        //     var newWebsiteID = getNextID();
        //     var newWebsite = {
        //         _id: newWebsiteID,
        //         name: website.name,
        //         description: website.description,
        //         developerId: userId
        //     };
        //     websites.push(newWebsite);
        // }
        //
        // function findWebsitesByUser(userId) {
        //     var result = [];
        //     for (var i = 0; i < websites.length; i++) {
        //         var website = websites[i];
        //         if (parseInt(website.developerId) === parseInt(userId)) {
        //             result.push(website);
        //         }
        //     }
        //     return result;
        // }
        //
        // function findWebsiteById(websiteId) {
        //     for (var i = 0; i < websites.length; i++) {
        //         var website = websites[i];
        //         if (parseInt(website._id) === parseInt(websiteId)) {
        //             return website;
        //         }
        //     }
        //     return null;
        // }
        //
        // function updateWebsite(websiteId, website) {
        //     var oldWebsite = findWebsiteById(websiteId);
        //     var index = websites.indexOf(oldWebsite);
        //     websites[index].name = website.name;
        //     websites[index].developerId = website.developerId;
        //     websites[index].description = website.description;
        // }
        //
        // function deleteWebsite(websiteId) {
        //     var oldWebsite = findWebsiteById(websiteId);
        //     var index = websites.indexOf(oldWebsite);
        //     websites.splice(index, 1);
        // }
    }
})();