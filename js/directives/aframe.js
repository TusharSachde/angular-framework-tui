myApp.directive('aframe', function ($timeout, $filter) {
    return {
        restrict: 'EA',
        scope: {
            link: "@"
        },
        link: function (scope, element, attr) {
            var imgUrl = $filter('i10c')(scope.link, 'XLARGE');
            var aframeTemplate = '<a-scene embedded><a-assets><img id=\"image\" src=\"' + imgUrl + '\" crossorigin=\"anonymous\"></a-assets><a-sky src=\"#image\"></a-sky></a-scene>';
            element.append(aframeTemplate);
        }
    };
});