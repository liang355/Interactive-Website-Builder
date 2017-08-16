module.exports = function(app, models) {
    var model = models.widgetModel;
    var multer  = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

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

    /*API calls implementation*/
    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;
        model
            .createWidget(pageId, widget)
            .then(function (widget) {
                res.send(widget);
            }, function (error) {
                res.sendStatus(500).send(error);
            })
        // var nextWidgetId = getNextID();
        // var newWidget = createWidgetMap[widget.widgetType](nextWidgetId, pageId, widget);
        // widgets.push(newWidget);
        // res.send(newWidget);
    }

    function findWidgetsByPageId(req, res) {
        var pageId = req.params.pageId;
        model
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                res.send(widgets);
            }, function (error) {
                console.log(error);
            })
        // function filterByPageId(widget) {
        //     return widget.pageId === pageId;
        // }
        // res.send(widgets.filter(filterByPageId));
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        model
            .findWidgetById(widgetId)
            .then(function (page) {
                res.send(page);
            }, function (error) {
                console.log(error);
            })
        // function findById(widget) {
        //     return widget._id === widgetId;
        // }
        // res.send(widgets.find(findById));
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        model
            .updateWidget(widgetId, widget)
            .then(function (widget) {
                res.send(widget);
            }, function (error) {
                res.sendStatus(500).send(error);
            })
        // for(var i = 0; i < widgets.length; i++) {
        //     if (widgets[i]._id === widgetId) {
        //         Object.assign(widgets[i], widget);
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        model
            .deleteWidget(widgetId)
            .then(function (response) {
                res.send(response);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
        // for(var i = 0; i < widgets.length; i++) {
        //     if (widgets[i]._id === widgetId) {
        //         widgets.splice(i, 1);
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }

    function sortWidget(req, res) {
        var pageId = req.params.pageId;

        var start = req.query.start;
        var end = req.query.end;

        model
            .reorderWidgetArray(pageId, start, end)
            .then(function (response) {
                console.log(response);

                },
                function (error) {
                    res.sendStatus(500).send(error);
                }
            );
        // model.reorderWidget(pageId, start, end);
    }

    function uploadImage(req, res) {
        var width = req.body.width;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var widgetId = req.body.widgetId;
        var redirectUrl = "/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/";

        var myFile = req.file;
        if(!myFile) {
            res.redirect(redirectUrl);
            return;
        }
        var filename = myFile.filename;           //new file name in upload folder
        var size = myFile.size;

        if(!widgetId) {
            var widget = {
                widgetType: 'IMAGE',
                size: size,
                text: '',
                name: '',
                width: width,
                url: '/uploads/' + filename
            };
            model
                .createWidget(pageId, widget)
                .then(function (widget) {
                    res.send(widget);
                }, function (error) {
                    res.sendStatus(500).send(widget);
                });
        } else {
            var updatedWidget = {
                url: '/uploads/' + filename
            };
            model.updateWidget(widgetId, widget)
                .then(function (widget) {
                    res.send(widget)
                }, function (error) {
                    res.sendStatus(500).send(widget);
                });
        }
        res.redirect(redirectUrl);
    }
};