/**
 * Created by yingbinliang on 7/19/17.
 */

(function(){
    var app = angular
        .module("WebAppMaker", ['ngRoute', 'ngSanitize', 'textAngular']);

    app.config(['$sceDelegateProvider', function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'https://www.youtube.com/**'
        ]);
    }]);
})();