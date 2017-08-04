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
        vm.pages = PageService.findPagesByWebsiteId(vm.wid);
    }

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.createPage = createPage;

        function createPage(){
            if(vm.name === undefined || vm.name === null || vm.name ==="") {
                vm.error = "page name cannot be empty";
                return;
            }
            var page = {
                name: vm.name,
                description: vm.description
            };
            PageService.createPage(vm.wid, page);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/");
        }
    }

    function EditPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;

        var page = PageService.findPageById(vm.pid);
        vm.name = page.name;
        vm.description = page.description;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function updatePage() {
            if(vm.name === undefined || vm.name === null || vm.name ==="") {
                vm.error = "page name cannot be empty";
                return;
            }
            var newPage = {
                name: vm.name,
                websiteId: vm.wid,
                description: vm.description
            };
            PageService.updatePage(vm.pid, newPage);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/");
        }

        function deletePage() {
            PageService.deletePage(vm.pid);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/");
        }
    }
})();