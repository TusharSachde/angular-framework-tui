myApp.controller('IndexCtrl', function ($scope, TemplateService, $uibModal) {
    $scope.template = TemplateService;

    if (/iPhone|iPad/i.test(navigator.userAgent)) {
        $('body').addClass('mobile ios');
    } else
    if (/Android/i.test(navigator.userAgent)) {
        $('body').addClass('mobile android');
    } else {
        $('body').addClass('desktop');
    }

});