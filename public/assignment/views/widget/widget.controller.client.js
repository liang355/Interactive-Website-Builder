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
        vm.widgets = WidgetService.findWidgetsByPageId(vm.pid);
        console.log(vm.widgets);
    }

    function NewWidgetController($routeParams, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.widgets = WidgetService.findWidgetsByPageId(vm.pid);
        vm.featureMissingAlert = null;
    }

    function CreateWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.widgetType = $routeParams.wtype;
        vm.createWidget = createWidget;
        vm.createError = null;
        console.log(vm.widgetSize);

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
            WidgetService.createWidget(vm.pid, newWidget);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
        }
    }

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        vm.widget = WidgetService.findWidgetById(vm.wgid);
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

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
            WidgetService.updateWidget(vm.wgid, latestData);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
        }

        function deleteWidget() {
            WidgetService.deleteWidget(vm.wgid);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
        }

    }
})();