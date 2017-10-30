// Add all the dependencies below
var myApp = angular.module('myApp', [
    'ui.router',
    'pascalprecht.translate',
    'angulartics',
    'angulartics.google.analytics',
    'ui.bootstrap',
    'ngAnimate',
    'ngSanitize',
    'angular-flexslider',
    'ui.swiper',
    'ngToast',
    '720kb.socialshare',
    'FBAngular'
]);


// Define all the routes below
myApp.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    var defaultTemplateUrl = "views/templates/template.html"; //Default Template URL
    var errorTemplateUrl = "views/error-pages/template.html"; //Error Template URL
    // for http request with session
    $httpProvider.defaults.withCredentials = true;
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: defaultTemplateUrl,
            controller: 'HomeCtrl',
        })

        .state('404', {
            url: "/404/",
            templateUrl: errorTemplateUrl,
            controller: 'Error404Ctrl',
        })

        .state('500', {
            url: "/500/",
            templateUrl: errorTemplateUrl,
            controller: 'Error500Ctrl',
        })

        .state('timeout', {
            url: "/timeout/",
            templateUrl: errorTemplateUrl,
            controller: 'TimeoutCtrl',
        })

        .state('upgrade', {
            url: "/upgrade/",
            templateUrl: errorTemplateUrl,
            controller: 'UpgradeCtrl',
        })

    ;
    $urlRouterProvider.otherwise("/"); // Default redirect to '/'
    $locationProvider.html5Mode(isProduction); // isProduction is defined in index file
});

myApp.config(function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
});

myApp.config(['ngToastProvider', function (ngToast) {
    ngToast.configure({
        verticalPosition: 'top',
        horizontalPosition: 'center',
        maxNumber: 3
    });
}]);

myApp.config(function ($httpProvider) {
    $httpProvider.defaults.timeout = 1000;
});