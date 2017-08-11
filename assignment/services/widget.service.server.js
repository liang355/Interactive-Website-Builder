module.exports = function(app) {
    var multer  = require('multer')
    var upload = multer({ dest: __dirname + '/public/assignment/uploads' })

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

    //POST Calls
    app.post('/api/page/:pageId/widget', createWidget);

    app.post('/api/upload', upload.single('myFile'), uploadImage);

    //GET Calls
    app.get('/api/page/:pageId/widget', findWidgetsByPageId);

    app.get('/api/widget/:widgetId', findWidgetById);

    //PUT Calls
    app.put('/api/widget/:widgetId', updateWidget);

    //DELETE Calls
    app.delete('/api/widget/:widgetId', deleteWidget);

    //Sort
    app.put('/api/page/:pageId/widget', sortWidget);

    //HELPER functions
    var createWidgetMap = {
        'HEADING': createHeaderWidget,
        'IMAGE': createImageWidget,
        'YOUTUBE': createYouTubeWidget,
        'HTML': createHTMLWidget
    };

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

    /*API calls implementation*/
    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;
        var nextWidgetId = getNextID();
        var newWidget = createWidgetMap[widget.widgetType](nextWidgetId, pageId, widget);
        widgets.push(newWidget);
        res.send(newWidget);
    }

    function findWidgetsByPageId(req, res) {
        var pageId = req.params.pageId;
        function filterByPageId(widget) {
            return widget.pageId === pageId;
        }
        res.send(widgets.filter(filterByPageId));
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        function findById(widget) {
            return widget._id === widgetId;
        }
        res.send(widgets.find(findById));
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        for(var i = 0; i < widgets.length; i++) {
            if (widgets[i]._id === widgetId) {
                Object.assign(widgets[i], widget);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for(var i = 0; i < widgets.length; i++) {
            if (widgets[i]._id === widgetId) {
                widgets.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function uplodadImage(req, res) {

    }
};