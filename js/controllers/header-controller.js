myApp.controller('HeaderCtrl', function ($scope, TemplateService, $uibModal) {
    $scope.template = TemplateService;

    //Scroll top for new pages
    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $(window).scrollTop(0);
    });

    $.fancybox.close(true);

});