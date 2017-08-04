(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", widgetService);

    //test:
    var newWidget = {"pageId": "222", "size": 3, "text": "hahaha ipsum"};
    var updatedWidget = widgetService().updateWidget("123", newWidget);
    console.log(JSON.stringify(updatedWidget));

    function widgetService() {
        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];
        var services = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        };
        return services;

        function getNextID() {
            function getMaxID(maxId, currentItem) {
                var currentId = parseInt(currentItem._id);
                if (maxId > currentId) {
                    return maxId;
                }
                else {
                    return currentId + 1;
                }
            }
            widgets.reduce(getMaxID, 0).toString();
        }

        function createWidget(pageId, widget) {
            var nextWidgetId = getNextID();
            var newWidget = widget;
            newWidget._id = nextWidgetId;
            newWidget.pageId = pageId;
            widgets.push(newWidget);
        }

        function findWidgetsByPageId(pageId) {
            for (var i = 0; i < widgets.length; i++) {
                var widget = widgets[i];
                if (widget.pageId === pageId) {
                    return widget;
                }
            }
            return null;
        }

        function findWidgetById(widgetId) {
            for (var i = 0; i< widgets.length; i++) {
                var widget = widgets[i];
                if (widget._id === widgetId) {
                    return widget;
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget) {
            var oldWidget = findWidgetById(widgetId);
            var index = widgets.indexOf(oldWidget);
            Object.assign(widgets[index], widget);
            return oldWidget;
        }

        function deleteWidget(widgetId) {
            var oldWidget = findWidgetById(widgetId);
            var index = Widgets.indexOf(oldWidget);
            widgets.splice(index, 1);
        }
    }
})();