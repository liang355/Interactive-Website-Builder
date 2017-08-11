(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("CreateWidgetController", CreateWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        WidgetService.findWidgetsByPageId(vm.pid)
            .then(function (response) {
                vm.widgets = response.data;
            });
    }

    function NewWidgetController($routeParams) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
    }

    function CreateWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.createWidget = createWidget;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.widgetType = $routeParams.wtype;
        vm.createError = null;

        function createWidget() {
            if (vm.widgetType === 'IMAGE' || vm.widgetType === 'YOUTUBE') {
                if (vm.widgetUrl === null || vm.widgetUrl === undefined || vm.widgetUrl === "") {
                    vm.createError = "Url is required for Image/Youtube";
                    return;
                }
            }
            if (vm.widgetType === 'HEADING') {
                if (vm.widgetText === null || vm.widgetText === undefined || vm.widgetText === "") {
                    vm.createError = "Text is required for Heading";
                    return;
                }
                if (vm.widgetSize !== undefined && (vm.widgetSize < 1 || vm.widgetSize > 6)) {
                    vm.createError = "Heading size is invalid, value must be between 1 and 6";
                    return;
                }
            }
            var newWidget = {
                name: vm.widgetName,
                text: vm.widgetText,
                widgetType: vm.widgetType,
                size: vm.widgetSize,
                width: vm.widgetWidth,
                url: vm.widgetUrl
            };
            WidgetService.createWidget(vm.pid, newWidget)
                .then(function (response) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                }, function (error) {
                    console.log(error);
                });

        }
    }

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        WidgetService.findWidgetById(vm.wgid)
            .then(function (response) {
                vm.widget = response.data;
                if (vm.widget.widgetType === "HEADING") {
                    vm.widgetName = vm.widget.name;
                    vm.widgetText = vm.widget.text;
                    vm.widgetSize = vm.widget.size;
                } else if (vm.widget.widgetType === "IMAGE") {
                    vm.widgetName = vm.widget.name;
                    vm.widgetText = vm.widget.text;
                    vm.widgetUrl = vm.widget.url;
                    vm.widgetWidth = vm.widget.width;
                } else if (vm.widget.widgetType === "YOUTUBE") {
                    vm.widgetName = vm.widget.name;
                    vm.widgetText = vm.widget.text;
                    vm.widgetUrl = vm.widget.url;
                    vm.widgetWidth = vm.widget.width;
                } else if (vm.widget.widgetType === "HTML") {
                    vm.widgetName = vm.widget.name;
                    vm.widgetText = vm.widget.text;
                }
            });

        function updateWidget() {
            if (vm.widget.widgetType === 'IMAGE' || vm.widget.widgetType === 'YOUTUBE') {
                if (vm.widgetUrl === null || vm.widgetUrl === undefined || vm.widgetUrl === "") {
                    vm.updateError = "Url is required for Image/Youtube";
                    return;
                }
            }
            if (vm.widget.widgetType === 'HEADING') {
                if (vm.widgetText === null || vm.widgetText === undefined || vm.widgetText === "") {
                    vm.updateError = "Text is required for Heading";
                    return;
                }
                if (vm.widgetSize !== null && (vm.widgetSize < 1 || vm.widgetSize > 6)) {
                    vm.updateError = "Heading size is invalid, value must be between 1 and 6";
                    return;
                }
            }
            var latestData = {
                name: vm.widgetName,
                text: vm.widgetText,
                widgetType: vm.widget.widgetType,
                size: vm.widgetSize,
                width: vm.widgetWidth,
                url: vm.widgetUrl
            };
            WidgetService.updateWidget(vm.wgid, latestData)
                .then(function (response) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                }, function (error) {
                    console.log(error);
                });
        }

        function deleteWidget() {
            WidgetService.deleteWidget(vm.wgid)
                .then(function (response) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                }, function (error) {
                    console.log(error);
                });
        }

    }
})();