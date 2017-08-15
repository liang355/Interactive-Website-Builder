(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        WebsiteService.findWebsitesByUser(vm.uid)
            .then(function (response) {
                vm.websites = response.data;
            });
    }

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.createWebsite = createWebsite;
        vm.uid = $routeParams.uid;
        WebsiteService.findWebsitesByUser(vm.uid)
            .then(function (response) {
                vm.websites = response.data;
            });

        function createWebsite() {
            if(vm.name === undefined || vm.name === null || vm.name ==="") {
                vm.error = "website name cannot be empty";
                return;
            }
            var website = {
                name: vm.name,
                description: vm.description
            };
            WebsiteService.createWebsite(vm.uid, website)
                .then(function (response) {
                    $location.url("/user/" + vm.uid + "/website");
                }, function (error) {
                    console.log(error);
                });
        }
    }

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        WebsiteService.findWebsitesByUser(vm.uid)
            .then(function (response) {
                vm.websites = response.data;
            }, function (error) {
                console.log("findWebsitesByUser() Error" , error);
            });
        WebsiteService.findWebsiteById(vm.wid)
            .then(function (response) {
                vm.website = response.data;
                vm.websiteName = vm.website.name;
                vm.websiteDescription = vm.website.description;
            });

        function updateWebsite() {
            if(vm.websiteName === undefined || vm.websiteName === null || vm.websiteName ==="") {
                vm.error = "website name cannot be empty";
                return;
            }
            var newWebsite = {
                name: vm.websiteName,
                description: vm.websiteDescription
            };
            WebsiteService.updateWebsite(vm.wid, newWebsite)
                .then(function (response) {
                    $location.url("/user/" + vm.uid + "/website/");
                }, function (error) {
                    console.log(error);
                });
        }

        function deleteWebsite() {
            console.log(vm.wid);
            console.log("aaaaa");
            WebsiteService.deleteWebsite(vm.wid)
                .then(function (response) {
                    $location.url("/user/" + vm.uid + "/website/");
                }, function (error) {
                    console.log(error);
                });
        }
    }

})();