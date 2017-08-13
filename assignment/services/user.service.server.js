module.exports = function (app, models) {

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email: "alice@gmail.com"},
        {_id: "100", username: "a", password: "a", firstName: "a", lastName: "a", email: "a@gmail.com"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: "bob@regge.com"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email: "charles@bing.com"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi", email: "jose@neu.com"}
    ];

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
    function getNextId() {
        function getMaxId(maxId, currentId) {
            var current = parseInt(currentId._id);
            if (maxId > current) {
                return maxId;
            } else {
                return current + 1;
            }
        }
        return users.reduce(getMaxId, 0).toString();
    }

    /*API implementation*/
    function createUser(req, res) {
        console.log("create user");
        var user = req.body;

        var newUser = {
            _id: getNextId(),
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        };
        users.push(newUser);
        //console.log(newUser);

        if(newUser){
            res.status(200).send(newUser);
        } else {
            res.sendStatus(500);
        }
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        var user = users.find(function (u) { return u._id === userId });
        if(user) {
            res.status(200).send(user);
        }
        else {
            res.status(404).send("not found!");
        }
    }

    function findUserByCredentials(req, res) {
        //console.log("findUserByCredentials query: ", req.query);

        // find user with all query parameters
        outerLoop:
        for(var i = 0; i < users.length; i++) {
            for (var prop in req.query) {
                if (req.query.hasOwnProperty(prop) && users[i][prop] !== req.query[prop]) {
                    continue outerLoop;
                }
            }
            var user = users[i];
            break;
        }

        //var user = users.find(function (u) { return u.username === username && u.password === pswd });
        res.send(user);
    }

    function updateUser(req,res) {
        var userId = req.params.userId;
        var new_user = req.body;

        for (var i = 0; i < users.length; i++){
            var user = users[i];
            if(user._id === userId){
                user.firstName = new_user.firstName;
                user.lastName = new_user.lastName;
                user.email = new_user.email;
                res.status(200).send(user);
                return;
            }
        }
        res.status(404).send("not found!");
    }

    function deleteUser(req,res) {
        var userId = req.params.userId;

        for (var i = 0; i < users.length; i++){
            var user = users[i];
            if(user._id === userId){
                users.splice(i,1);
                res.sendStatus(200);
                return;
            }
        }
        res.status(404).send("not found!");
    }
};