var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public/assignment/'));
app.set('port', (process.env.PORT || 3000));
require("./assignment/app.js")(app);

app.listen(app.get('port'), function () {
    console.log("listening on port", app.get('port'), " ...")
});