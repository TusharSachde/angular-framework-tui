myApp.controller('Error404Ctrl', function ($scope, TemplateService) {
        // Setting up the template content url
        $scope.template = TemplateService.getHTML("error-pages/content/404.html");
        TemplateService.title = "404"; // Setting the Title of the Website
    })

    .controller('Error500Ctrl', function ($scope, TemplateService) {
        // Setting up the template content url
        $scope.template = TemplateService.getHTML("error-pages/content/500.html");
        TemplateService.title = "500"; // Setting the Title of the Website
    })

    .controller('TimeoutCtrl', function ($scope, TemplateService) {
        // Setting up the template content url
        $scope.template = TemplateService.getHTML("error-pages/content/timeout.html");
        TemplateService.title = "Session Timeout"; // Setting the Title of the Website
    })

    .controller('UpgradeCtrl', function ($scope, TemplateService) {
        // Setting up the template content url
        $scope.template = TemplateService.getHTML("error-pages/content/upgrade.html");
        TemplateService.title = "Server Maintenance"; // Setting the Title of the Website
    });