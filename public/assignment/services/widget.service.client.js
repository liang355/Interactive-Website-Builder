(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", widgetService);

    function widgetService() {
        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "name": "Grizzy", "text": "GIZMODO Heading"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "name": "Head1","text": "Heading1"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "name": "RandomImage",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "name": "HTMLWidget1", "text": "<p>This is HTML widget 1</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "name": "Head2", "text": "Heading2"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "name": "Yacht",
                "url": "https://www.youtube.com/embed/AM2Ivdi9c4E", "text": "Sailing Yacht" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "name": "HTMLWidget2", "text": "<p>This is HTML widget 2</p>"}
        ];

        var createWidgetMap = {
            'HEADING': createHeaderWidget,
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
            return widgets.reduce(getMaxID, 0).toString();
        }

        function createHeaderWidget(widgetId, pageId, widget) {
            return {
                _id: widgetId,
                widgetType: 'HEADING',
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
            console.log(nextWidgetId);
            var newWidget = createWidgetMap[widget.widgetType](nextWidgetId, pageId, widget);
            console.log(newWidget);
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
            var index = widgets.indexOf(oldWidget);
            widgets.splice(index, 1);
        }
    }
})();