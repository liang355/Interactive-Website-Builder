(function () {
    angular.module("WebAppMaker")
        .factory("PageService", pageService);

    // console.log(pageService().findPagesByWebsiteId("456"));

    function pageService() {
        var pages = [
            { _id: "321", name: "Post 1", websiteId: "456", description: "Lorem" },
            { _id: "432", name: "Post 2", websiteId: "456", description: "Lorem" },
            { _id: "543", name: "Post 3", websiteId: "456", description: "Lorem" }
        ];
        var services = {
            "createPage": createPage,
            "findPagesByWebsiteId": findPagesByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return services;

        function getNextID() {
            function getMaxId(maxId, currentId) {
                var current = parseInt(currentId._id);
                if (maxId > current) {
                    return maxId;
                }
                else {
                    return current + 1;
                }
            }
            return pages.reduce(getMaxId, 0).toString();
        }
        
        function createPage(websiteId, page) {
            var newPageId = getNextID();
            var newPage = {
                _id: newPageId,
                name: page.name,
                websiteId: websiteId,
                description: page.description
            };
            if (newPage.name === "") {

            }
            pages.push(newPage);
        }
        
        function findPagesByWebsiteId(websiteId) {
            var result = [];
            for (var i = 0; i < pages.length; i++) {
                var page = pages[i];
                if (parseInt(page.websiteId) === parseInt(websiteId)) {
                    result.push(page);
                }
            }
            return result;
        }
        
        function findPageById(pageId) {
            for (var i = 0; i < pages.length; i++) {
                var page = pages[i];
                if (page._id === pageId) {
                    return page;
                }
            }
            return null;
        }

        function updatePage(pageId, page) {
            var oldPage = findPageById(pageId);
            var index = pages.indexOf(oldPage);
            pages[index].name = page.name;
            pages[index].websiteId = page.websiteId;
            pages[index].description = page.description;
        }

        function deletePage(pageId) {
            var oldPage = findPageById(pageId);
            var index = pages.indexOf(oldPage);
            pages.splice(index, 1);
        }
    }
})();