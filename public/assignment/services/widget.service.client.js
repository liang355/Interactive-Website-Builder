(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", widgetService);

    function widgetService($http) {
        var services = {
            'createWidget': createWidget,
            'findWidgetsByPageId': findWidgetsByPageId,
            'findWidgetById': findWidgetById,
            'updateWidget': updateWidget,
            'deleteWidget': deleteWidget
        };
        return services;

        function createWidget(pageId, widget) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.post(url, widget);
        }

        function findWidgetsByPageId(pageId) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url);
        }

        function findWidgetById(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.get(url);
        }

        function updateWidget(widgetId, widget) {
            var url = "/api/widget/" + widgetId;
            return $http.put(url, widget);
        }

        function deleteWidget(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.delete(url);
        }

        // function createWidget(pageId, widget) {
        //     var nextWidgetId = getNextID();
        //     console.log(nextWidgetId);
        //     var newWidget = createWidgetMap[widget.widgetType](nextWidgetId, pageId, widget);
        //     console.log(newWidget);
        //     widgets.push(newWidget);
        // }
        //
        // function findWidgetsByPageId(pageId) {
        //     function filterByPageId(widget) {
        //         return widget.pageId === pageId;
        //     }
        //
        //     return widgets.filter(filterByPageId);
        // }
        //
        // function findWidgetById(widgetId) {
        //     for (var i = 0; i< widgets.length; i++) {
        //         var widget = widgets[i];
        //         if (widget._id === widgetId) {
        //             return widget;
        //         }
        //     }
        //     return null;
        // }
        //
        // function updateWidget(widgetId, widget) {
        //     var oldWidget = findWidgetById(widgetId);
        //     var index = widgets.indexOf(oldWidget);
        //     Object.assign(widgets[index], widget);
        //     return oldWidget;
        // }
        //
        // function deleteWidget(widgetId) {
        //     var oldWidget = findWidgetById(widgetId);
        //     var index = widgets.indexOf(oldWidget);
        //     widgets.splice(index, 1);
        // }
    }
})();