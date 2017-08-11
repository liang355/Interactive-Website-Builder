(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", pageService);

    // console.log(pageService().findPagesByWebsiteId("456"));

    function pageService($http) {
        var services = {
            "createPage": createPage,
            "findPagesByWebsiteId": findPagesByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return services;

        function createPage(websiteId, page) {
            var url = "/api/website/" + websiteId + "/page";
            return $http.post(url, page);
        }

        function findPagesByWebsiteId(websiteId) {
            var url = "/api/website/" + websiteId + "/page";
            return $http.get(url);
        }

        function findPageById(pageId) {
            var url = "/api/page/" + pageId;
            return $http.get(url);
        }

        function updatePage(pageId, page) {
            var url = "/api/page/" + pageId;
            return $http.put(url, page);
        }

        function deletePage(pageId) {
            var url = "/api/page/" + pageId;
            return $http.delete(url);
        }

        // function getNextID() {
        //     function getMaxId(maxId, currentId) {
        //         var current = parseInt(currentId._id);
        //         if (maxId > current) {
        //             return maxId;
        //         }
        //         else {
        //             return current + 1;
        //         }
        //     }
        //     return pages.reduce(getMaxId, 0).toString();
        // }
        //
        // function createPage(websiteId, page) {
        //     var newPageId = getNextID();
        //     var newPage = {
        //         _id: newPageId,
        //         name: page.name,
        //         websiteId: websiteId,
        //         description: page.description
        //     };
        //     if (newPage.name === "") {
        //
        //     }
        //     pages.push(newPage);
        // }
        //
        // function findPagesByWebsiteId(websiteId) {
        //     var result = [];
        //     for (var i = 0; i < pages.length; i++) {
        //         var page = pages[i];
        //         if (parseInt(page.websiteId) === parseInt(websiteId)) {
        //             result.push(page);
        //         }
        //     }
        //     return result;
        // }
        //
        // function findPageById(pageId) {
        //     for (var i = 0; i < pages.length; i++) {
        //         var page = pages[i];
        //         if (page._id === pageId) {
        //             return page;
        //         }
        //     }
        //     return null;
        // }
        //
        // function updatePage(pageId, page) {
        //     var oldPage = findPageById(pageId);
        //     var index = pages.indexOf(oldPage);
        //     pages[index].name = page.name;
        //     pages[index].websiteId = page.websiteId;
        //     pages[index].description = page.description;
        // }
        //
        // function deletePage(pageId) {
        //     var oldPage = findPageById(pageId);
        //     var index = pages.indexOf(oldPage);
        //     pages.splice(index, 1);
        // }
    }
})();