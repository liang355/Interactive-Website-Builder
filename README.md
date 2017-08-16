# web-dev-template

1. git clone https://github.com/jannunzi/web-dev-template.git
1. cd web-dev-template
1. npm install
1. mongod
1. node server.js
1. browse to localhost:3000

Quick navigation to widget page:
   username: jannunzi, password: jannunzi
=> click [websites] => click [Gizmodo] => click [GizPost 1] => play around with widgets

Default mLab collections and documents:
User:
{"_id": "123", "username": "alice", "password": "alice", "firstName": "Alice", "lastName": "Wonder", "email": "alice@gmail.com"},
{"_id": "100", "username": "a", "password": "a", "firstName": "a", "lastName": "a", "email": "a@gmail.com"},
{"_id": "234", "username": "bob", "password": "bob", "firstName": "Bob", "lastName": "Marley", "email": "bob@regge.com"},
{"_id": "345", "username": "charly", "password": "charly", "firstName": "Charly", "lastName": "Garcia", "email": "charles@bing.com"},
{"_id": "456", "username": "jannunzi", "password": "jannunzi", "firstName": "Jose", "lastName": "Annunzi", "email": "jose@neu.com"}

Website:
[{"_id": "123", "name": "Facebook", "_user": "456", "description": "Test01"},
{"_id": "234", "name": "Tweeter", "_user": "456", "description": "Test02"},
{"_id": "456", "name": "Gizmodo", "_user": "456", "description": "Test03"},
{"_id": "567", "name": "Tic Tac Toe", "_user": "123", "description": "Test04"},
{"_id": "678", "name": "Checkers", "_user": "123", "description": "Test05"},
{"_id": "789", "name": "Chess", "_user": "234", "description": "Test06"}]

Page:
[{ "_id": "321", "name": "GizPost 1", "_website": "456", "description": "Lorem" },
{ "_id": "432", "name": "GizPost 2", "_website": "456", "description": "Lorem" },
{ "_id": "543", "name": "GizPost 3", "_website": "456", "description": "Lorem" }]

Widget:
[{ "_id": "123", "widgetType": "HEADING", "_page": "321", "size": 2, "name": "Grizzy", "text": "GIZMODO Heading"},
{ "_id": "234", "widgetType": "HEADING", "_page": "321", "size": 4, "name": "Head1","text": "Heading1"},
{ "_id": "345", "widgetType": "IMAGE", "_page": "321", "width": "100%", "name": "RandomImage", "url": "http://lorempixel.com/400/200/"},
{ "_id": "456", "widgetType": "HTML", "_page": "321", "name": "HTMLWidget1", "text": "<p>This is HTML widget 1</p>"},
{ "_id": "567", "widgetType": "HEADING", "_page": "321", "size": 4, "name": "Head2", "text": "Heading2"},
{ "_id": "678", "widgetType": "YOUTUBE", "_page": "321", "width": "100%", "name": "Yacht", "url": "https://www.youtube.com/embed/AM2Ivdi9c4E", "text": "Sailing Yacht" },
{ "_id": "789", "widgetType": "HTML", "_page": "321", "name": "HTMLWidget2", "text": "<p>This is HTML widget 2</p>"}]