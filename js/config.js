var isProduction = false; // Production mode disabled
var apiUrl;

// Detecting mobile phones
if (/Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent)) {
    isPhone = true;
} else {
    isPhone = false;
}

// WebGL support check
if (Detector.webgl) {
    console.log('WebGL Supported');
} else {
    var warning = Detector.getWebGLErrorMessage();
    console.error(warning);
}

// Setting up environment variables
var env = window.location.hostname;
env = env.slice(0, 3);
/*
 * 'loc' = Localhost 
 * 'dev' = Development
 * 'tes' = Test
 * 'sta' = Stage
 * 'ins' = Production
 */

// get window language
var windowLanguage = (window.navigator.language || window.navigator.userLanguage) ?
    (window.navigator.language || window.navigator.userLanguage) :
    window.navigator.languages[0];


// Setting google analytics code as per environment
var gaCode = '';
if (env != 'loc') { // check if not localhost

    // Google analytics code as per environment
    if (env === 'dev') {
        apiUrl = '';
        gaCode = '';
    } else if (env === 'tes') {
        apiUrl = '';
        gaCode = '';
    } else if (env === 'sta') {
        apiUrl = '';
        gaCode = '';
    } else if (env === 'ins') {
        apiUrl = '';
        gaCode = '';
    }

}

var errorPages = ['404', '500', 'timeout', 'upgrade'];