(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
    }

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
        vm.createWebsite = createWebsite;

        function createWebsite(name, description) {
            if(vm.name === undefined || vm.name === null || vm.name ==="") {
                vm.error = "website name cannot be empty";
                return;
            }
            var website = {
                name: name,
                description: description
            };
            WebsiteService.createWebsite(vm.uid, website);
            $location.url("/user/" + vm.uid + "/website");
        }
    }

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.websites = WebsiteService.findWebsitesByUser(vm.uid);

        var website = WebsiteService.findWebsiteById(vm.wid);
        vm.websiteName = website.name;
        vm.websiteDescription = website.description;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function updateWebsite() {
            if(vm.websiteName === undefined || vm.websiteName === null || vm.websiteName ==="") {
                vm.error = "website name cannot be empty";
                return;
            }
            var newWebsite = {
                name: vm.websiteName,
                developerId: vm.uid,
                description: vm.websiteDescription
            };
            WebsiteService.updateWebsite(vm.wid, newWebsite);
            $location.url("/user/" + vm.uid + "/website/");
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.wid);
            $location.url("/user/" + vm.uid + "/website/");
        }
    }

})();