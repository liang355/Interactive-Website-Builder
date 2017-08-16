(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        PageService.findPagesByWebsiteId(vm.wid)
            .then(function (response) {
                vm.pages = response.data;
            });
    }

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.createPage = createPage;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;

        function createPage(){
            if(vm.name === undefined || vm.name === null || vm.name ==="") {
                vm.error = "page name cannot be empty";
                return;
            }
            var page = {
                name: vm.name,
                description: vm.description
            };
            PageService.createPage(vm.wid, page)
                .then(function (response) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/");
                }, function (error) {
                    console.log(error);
                });
        }
    }

    function EditPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;

        PageService.findPageById(vm.pid)
            .then(function (response) {
                var page = response.data;
                vm.name = page.name;
                vm.description = page.description;
            });

        function updatePage() {
            if(vm.name === undefined || vm.name === null || vm.name ==="") {
                vm.error = "page name cannot be empty";
                return;
            }
            var newPage = {
                name: vm.name,
                description: vm.description
            };
            PageService.updatePage(vm.pid, newPage)
                .then(function (response) {
                    console.log(response);
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/");
                }, function (error) {
                    console.log(error);
                });
        }

        function deletePage() {
            PageService.deletePage(vm.pid)
                .then(function (response) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/");
                });
        }
    }
})();