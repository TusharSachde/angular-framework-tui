myApp.factory('apiFactory', function ($http, $q, $timeout) {
    return {
        demo: function (success, error) {
            $http({
                url: apiUrl + 'demo/',
                method: 'GET'
            }).then(success).catch(error);
        },
    };
});