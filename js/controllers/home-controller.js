myApp.controller('HomeCtrl', function ($rootScope, $location, $scope, $timeout, $window, $state, $filter, $locale, $uibModal, $translate, ngToast, TemplateService, apiFactory, $analytics) {
    TemplateService.title = 'TUI AngularJS';
    $scope.template = TemplateService.getHTML("content/home.html");

    //Dummy API
    $scope.dummyAPI = function () {
        apiFactory.demo(function (response) { // Success function
            console.log(response);

        }, function (error) { // Error function
            console.log(error);
        });
    };

});