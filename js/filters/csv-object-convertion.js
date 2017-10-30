myApp.filter('csvToObject', function () {
    return function (input) {
        if (input) {
            var output;
            output = input.split(',');
            return output;
        }
    };
});

myApp.filter('objectToCSV', function () {
    return function (objArray) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';
        var addToStr = '';
        for (var i = 0; i < array.length; i++) {
            addToStr = array[i].toString();
            if (i === 0) {
                str = str + addToStr;
            } else {
                str = str + ',' + addToStr;
            }
        }
        return str.toString();
    };
});