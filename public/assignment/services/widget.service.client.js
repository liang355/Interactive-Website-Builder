(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", widgetService);

    function widgetService() {
        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO Heading"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Heading1"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Hello HTML World</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Heading2"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://www.youtube.com/embed/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Hello HTML World</p>"}
        ];

        var createWidgetMap = {
            'HEADER': createHeaderWidget,
            'IMAGE': createImageWidget,
            'YOUTUBE': createYouTubeWidget,
            'HTML': createHTMLWidget
        };

        var services = {
            'createWidget': createWidget,
            'findWidgetsByPageId': findWidgetsByPageId,
            'findWidgetById': findWidgetById,
            'updateWidget': updateWidget,
            'deleteWidget': deleteWidget,
            'getEmbedURL': getEmbedURL
        };
        return services;

        function getEmbedURL(widgetId) {
            var widget = findWidgetById(widgetId);
            var tail = widget.url.substring(17);
            return "https://youtu.be/" + tail;
        }

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

        function createHeaderWidget(widgetId, pageId, widget) {
            return {
                _id: widgetId,
                widgetType: 'HEADER',
                pageId: pageId,
                size: widget.size,
                name: widget.name,
                text: widget.text
            };
        }

        function createHTMLWidget(widgetId, pageId, widget) {
            return {
                _id: widgetId,
                widgetType: 'HTML',
                pageId: pageId,
                name: widget.name,
                text: widget.text
            };
        }

        function createImageWidget(widgetId, pageId, widget) {
            return {
                _id: widgetId,
                widgetType: 'IMAGE',
                pageId: pageId,
                width: widget.width,
                url: widget.url,
                name: widget.name,
                text: widget.text
            };

        }

        function createYouTubeWidget(widgetId, pageId, widget) {
            return {
                _id: widgetId,
                widgetType: 'YOUTUBE',
                pageId: pageId,
                name: widget.name,
                text: widget.text,
                width: widget.width,
                url: widget.url
            };
        }

        function createWidget(pageId, widget) {
            var nextWidgetId = getNextID();
            var newWidget = widget;
            newWidget._id = nextWidgetId;
            newWidget.pageId = pageId;
            widgets.push(newWidget);
        }

        function findWidgetsByPageId(pageId) {
            function filterByPageId(widget) {
                return widget.pageId === pageId;
            }

            return widgets.filter(filterByPageId);
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