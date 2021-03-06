/**
 * Created by stan on 6/16/17.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("CreateWidgetController", CreateWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, $sce, WidgetService, loggedin) {
        var vm = this;
        // vm.uid = $routeParams.uid;
        vm.uid = loggedin._id;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        vm.trustThisContent = trustThisContent;
        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;

        function trustThisContent(html) {
            //diligence to scrub any unsafe content
            return $sce.trustAsHtml(html);
        }

        function getYouTubeEmbedUrl(youTubeLink) {
            var embedUrl = "https://www.youtube.com/embed/";
            var youTubeLinkParts = youTubeLink.split('/');
            var id = youTubeLinkParts[youTubeLinkParts.length - 1];
            embedUrl += id;
            return $sce.trustAsResourceUrl(embedUrl);
        }

        // WebsiteService
        //     .findWebsitesByUser(vm.uid)
        //     .then(function (website) {
        //         vm.website = website;
        //     });
        //
        // PageService
        //     .findPageById(vm.pid)
        //     .then(function (page) {
        //         vm.page = page;
        //     });

        function init() {
            WidgetService
                .findWidgetsByPageId(vm.pid)
                .then(function (widget) {
                    vm.widget = widget;
                });
        }
        init();
    }

    function NewWidgetController($routeParams, WidgetService, loggedin) {
        var vm = this;
        // vm.uid = $routeParams.uid;
        vm.uid = loggedin._id;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;

        WidgetService
            .findWidgetsByPageId(vm.pid)
            .then(function (widgets) {
                vm.widgets = widgets;
            });
    }

    function CreateWidgetController($routeParams, $location, WidgetService, loggedin) {
        var vm = this;
        // vm.uid = $routeParams.uid;
        vm.uid = loggedin._id;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        vm.widgetType = $routeParams.wtype;
        vm.createWidget = createWidget;
        vm.createError = null;


        function createWidget() {
            if (vm.widgetType === 'IMAGE' || vm.widgetType === 'YOUTUBE') {
                if (vm.widget.url === null || vm.widget.url === undefined) {
                    vm.createError = "Url is required for Image/Youtube";
                    return;
                }
            }
            if (vm.widgetType === 'HEADING') {
                if (vm.widget.text === null || vm.widget.text === undefined
                    || vm.widget.size === null || vm.widget.size === undefined) {
                    vm.createError = "Text is required for Header";
                    return;
                }
            }
            var newWidget = {
                name: vm.widget.name,
                text: vm.widget.text,
                widgetType: vm.widgetType,
                pageId: vm.pid,
                size: vm.widget.size,
                width: vm.widget.width,
                url: vm.widget.url,
                rows: vm.widget.rows,
                placeholder: vm.widget.placeholder,
                formatted: vm.widget.formatted
            };
            if(newWidget === null || newWidget === undefined) {
                vm.createError = "no valid";
                return;
            }

            WidgetService
                .createWidget(vm.pid, newWidget)
                .then(function () {
                    $location.url("/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                });
        }
    }

    function EditWidgetController($routeParams, WidgetService, $location, loggedin) {
        var vm = this;
        // vm.uid = $routeParams.uid;
        vm.uid = loggedin._id;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        vm.editWidget = editWidget;
        vm.deleteWidget = deleteWidget;

        WidgetService
            .findWidgetById(vm.wgid)
            .then(function (widget) {
               vm.widget = widget;

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
               } else if (vm.widget.widgetType === "TEXT") {
                   vm.widgetText = vm.widget.text;
                   vm.widgetRows = vm.widget.rows;
                   vm.widgetPlaceholder = vm.widget.placeholder;
                   vm.widgetFormatted = vm.widget.formatted;
               }
            });

        function init() {
            WidgetService
                .findWidgetById(vm.wgid)
                .then(function (widget) {
                    vm.widget = widget;
                });
        }

        function classifyType() {
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
            } else if (vm.widget.widgetType === "TEXT") {
                vm.widgetText = vm.widget.text;
                vm.widgetRows = vm.widget.rows;
                vm.widgetPlaceholder = vm.widget.placeholder;
                vm.widgetFormatted = vm.widget.formatted;
            }
        }

        function editWidget() {
            init();
            classifyType();
            var latestData = {
                _id: vm.wgid,
                name: vm.widgetName,
                text: vm.widgetText,
                widgetType: vm.widget.widgetType,
                size: vm.widgetSize,
                width: vm.widgetWidth,
                url: vm.widgetUrl,
                rows: vm.widgetRows,
                placeholder: vm.widgetPlaceholder,
                formatted: vm.widgetFormatted
            };

            console.log(latestData);
            WidgetService
                .updateWidget(vm.wgid, latestData)
                .then(function () {
                    $location.url("/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                });
        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.pid, vm.wgid)
                .then(function () {
                    $location.url("/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                });
        }
    }

})();