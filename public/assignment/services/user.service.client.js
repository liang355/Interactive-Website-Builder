(function () {
   angular
       .module("WebAppMaker")
       .factory("UserService", userService);

   function userService($http) {
       var services = {
           "createUser": createUser,
           "findUserById": findUserById,
           "findAllUser": findAllUser,
           "findUserByUsername": findUserByUsername,
           "findUserByCredentials": findUserByCredentials,
           "updateUser": updateUser,
           "deleteUser": deleteUser
       };
       return services;

       function createUser(user) {
           var url = "/api/user";
           return $http.post(url, user);
       }

       function findUserById(userId) {
           var url = "/api/user/" + userId;
           return $http.get(url);
       }

       function findAllUser() {
           var url = "/api/user/";
           return $http.get(url);
       }

       function findUserByUsername(username) {
           var url = "/api/user?"+"username="+username;
           return $http.get(url);
       }

       function findUserByCredentials(username, password) {
           var url = "/api/user?" + "username="+username + "&" + "password="+password;
           return $http.get(url);
       }

       function updateUser(userId, user) {
           var url = "/api/user/" + userId;
           return $http.put(url, user);
       }

       function deleteUser(userId) {
           var url = "/api/user/" + userId;
           return $http.delete(url);
       }

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
       //
       // function createUser(user) {
       //     var newUserId = getNextId();
       //     var newUser = {
       //         _id: newUserId,
       //         username: user.username,
       //         password: user.password,
       //         firstName: user.firstName,
       //         lastName: user.lastName,
       //         email: user.email
       //     };
       //     users.push(newUser);
       // }
       //
       // function findUserById(userId) {
       //     for (var i = 0; i < users.length; i++) {
       //         var user = users[i];
       //         if(parseInt(user._id) === parseInt(userId)){
       //             return user;
       //         }
       //     }
       //     return null;
       // }
       //
       // function findUserByUsername(username) {
       //     for (var i = 0; i < users.length; i++) {
       //         var user = users[i];
       //         if(user.username === username){
       //             return user;
       //         }
       //     }
       //     return null;
       // }
       //
       // function findUserByCredentials(username, password) {
       //     for (var i = 0; i < users.length; i++) {
       //         var user = users[i];
       //         if((user.username === username) && (user.password === password)){
       //             return user;
       //         }
       //     }
       //     return null;
       // }
       //
       // function updateUser(userId, user) {
       //     var oldUser = findUserById(userId);
       //     var index = users.indexOf(oldUser);
       //     users[index].firstName = user.firstName;
       //     users[index].lastName = user.lastName;
       //     users[index].email = user.email;
       // }
       //
       // function deleteUser(userId) {
       //     var oldUser = findUserById(userId);
       //     var index = users.indexOf(oldUser);
       //     users.splice(index, 1);
       // }
   }
})();
