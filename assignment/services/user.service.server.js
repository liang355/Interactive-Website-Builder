module.exports = function (app, models) {

    var model = models.userModel;

    // var users = [
    //     {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email: "alice@gmail.com"},
    //     {_id: "100", username: "a", password: "a", firstName: "a", lastName: "a", email: "a@gmail.com"},
    //     {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: "bob@regge.com"},
    //     {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email: "charles@bing.com"},
    //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi", email: "jose@neu.com"}
    // ];

    // POST Calls.
    app.post('/api/user', createUser);

    // GET Calls.
    app.get('/api/user/:userId', findUserById);

    app.get('/api/user/', findUserByCredentials);

    // PUT Calls.
    app.put('/api/user/:userId', updateUser);

    // DELETE Calls.
    app.delete('/api/user/:userId', deleteUser);


    // HELPER functions:
    // function getNextId() {
    //     function getMaxId(maxId, currentId) {
    //         var current = parseInt(currentId._id);
    //         if (maxId > current) {
    //             return maxId;
    //         } else {
    //             return current + 1;
    //         }
    //     }
    //     return users.reduce(getMaxId, 0).toString();
    // }

    /*API implementation*/
    function createUser(req, res) {
        var user = req.body;
        model
            .createUser(user)
            .then(
                function (newUser) {
                    console.log("new user", user);
                    res.json(newUser);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
    }

    function findUserById(req, res){
        var params = req.params;
        if(params.userId){
            model
                .findUserById(params.userId)
                .then(
                    function (user){
                        console.log("service.server", user);
                        if(user){
                            res.json(user);
                        } else {
                            user = null;
                            res.send(user);
                        }
                    },
                    function (error){
                        console.log("error!!!");
                        res.sendStatus(400).send(error);
                    }
                );
        }
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username && password) {
            model
                .findUserByCredentials(username, password)
                .then(function (user) {
                    res.send(user);
                }, function (error) {
                    console.log(error);
                });
        }
        else if (username) {
            model
                .findUserByUsername(username)
                .then(function (user) {
                    res.send(user);
                }, function (error) {
                    console.log(error);
                })
        } else {
            model
                .findAllUser()
                .then(function (user) {
                    res.send(user);
                }, function (error) {
                    console.log(error);
                });
        }

        // find user with all query parameters
        // outerLoop:
        // for(var i = 0; i < users.length; i++) {
        //     for (var prop in req.query) {
        //         if (req.query.hasOwnProperty(prop) && users[i][prop] !== req.query[prop]) {
        //             continue outerLoop;
        //         }
        //     }
        //     var user = users[i];
        //     break;
        // }

        //var user = users.find(function (u) { return u.username === username && u.password === pswd });
        // res.send(user);
    }

    function updateUser(req,res) {
        var userId = req.params.userId;
        var user = req.body;

        model
            .updateUser(userId, user)
            .then(function (response) {
                res.send(response);
            }, function (error) {
                res.sendStatus(404).send(error);
            })

        // for (var i = 0; i < users.length; i++){
        //     var user = users[i];
        //     if(user._id === userId){
        //         user.firstName = new_user.firstName;
        //         user.lastName = new_user.lastName;
        //         user.email = new_user.email;
        //         res.status(200).send(user);
        //         return;
        //     }
        // }
        // res.status(404).send("not found!");
    }

    function deleteUser(req,res) {
        var userId = req.params.userId;
        if (userId) {
            model.deleteUser(userId)
                .then(function (response) {
                    res.send(response);
                }, function (error) {
                    res.sendStatus(404).send(error);
                });
        } else {
            res.sendStatus(400);
        }
    }
};