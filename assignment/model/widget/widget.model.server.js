module.exports = function(mongoose, pageModel) {
    var widgetSchema = require('./widget.schema.server.js')(mongoose);
    var widgetModel = mongoose.model('widgetModel', widgetSchema);

    var api = {
        'createWidget' : createWidget,
        'findAllWidgetsForPage' : findAllWidgetsForPage,
        'findWidgetById' : findWidgetById,
        'updateWidget' : updateWidget,
        'deleteWidget' : deleteWidget,
        'reorderWidget' : reorderWidget,
        'reorderWidgetArray': reorderWidgetArray
    };

    return api;

    function createWidget(pageId, widget) {
        // if (widget.rows === undefined) {
        //     widget.rows = -1;
        // }
        // if (widget.size === undefined) {
        //     widget.size = -1;
        // }
        widget._id = new Date().getTime().toString();
        widget._page = pageId;

        return widgetModel
            .create(widget)
            .then(
                function (widget) {
                    return pageModel
                        .addWidgetToPage(pageId, widget._id);
                });
    }

    function findAllWidgetsForPage(pageId) {
        //find widgets in page.widgets.
        return widgetModel
            .find({_page: pageId})
            .populate('_page')
            .exec();
    }

    function findWidgetById(widgetId) {
        return widgetModel.findOne({_id: widgetId});
    }

    function updateWidget(widgetId, widget) {
        // if (widget.rows === undefined) {
        //     widget.rows = -1;
        // }
        // if (widget.size === undefined) {
        //     widget.size = -1;
        // }
        // console.log(typeof widget.size);

        return widgetModel
            .update({_id : widgetId}, widget);
    }

    function deleteWidget(widgetId) {
        return widgetModel
            .findById(widgetId)
            .then(function (widget) {
                var pageId = widget._page;
                return pageModel
                    .removeWidgetFromPage(pageId, widgetId)
                    .then(function (widget) {
                        return widgetModel
                            .remove({_id: widgetId});
                    });
            });

    }

    function reorderWidget(pageId, start, end) {
        var tempWidgets;
        return widgetModel
            .find({_page: pageId})
            .then(function (widgets) {
                tempWidgets = widgets;
                // var _idArray = widgets.map(function(widget) {return widget._id;});
                // console.log(_idArray);
                return widgetModel
                    .remove({_page: pageId})
                    .then(function (response) {
                        // console.log(response);
                        return widgetModel
                            .create(tempWidgets, function (err, newWidgets) {
                                if (err) {
                                    console.log(err)
                                }
                                console.log(newWidgets);
                            })

                    });
            });
    }

    function reorderWidgetArray(pageId, start, end) {
        return pageModel
            .findPageById(pageId)
            .then(
                function (page) {
                    if(start && end) {

                        if(end >= page.widgets.length) {

                            var k = end - page.widgets.length;
                            while((k--) + 1) {
                                page.widgets.push(undefined);
                            }
                        }
                        page.widgets.splice(end, 0, page.widgets.splice(start, 1)[0]);

                        return page.save();
                    }
                }
            )
    }
};