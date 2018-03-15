var jsArray = [

    // Config file
    './js/config.js',

    // JS & jQuery Libs
    './bower_components/jquery/dist/jquery.js',
    './bower_components/bootstrap/dist/js/bootstrap.min.js',
    './bower_components/jStorage/jstorage.js',
    './bower_components/moment/min/moment.min.js',
    './bower_components/font-awesome/svg-with-js/js/fontawesome-all.js',
    './bower_components/fancybox/dist/jquery.fancybox.js',

    // Angular Libs
    './bower_components/angular/angular.js',
    './bower_components/angular-sanitize/angular-sanitize.js',
    './bower_components/angular-animate/angular-animate.min.js',
    './bower_components/angular-touch/angular-touch.min.js',
    './bower_components/angular-ui-router/release/angular-ui-router.min.js',
    './bower_components/ui-bootstrap4/docs/ui-bootstrap.js',
    './bower_components/ui-bootstrap4/docs/ui-bootstrap-tpls.js',
    './bower_components/angular-translate/angular-translate.js',
    './bower_components/angulartics/dist/angulartics.min.js',
    './bower_components/angulartics-google-analytics/dist/angulartics-ga.min.js',
    './bower_components/angular-ui-swiper/dist/angular-ui-swiper.js',
    './bower_components/ngToast/dist/ngToast.js',
    './bower_components/angular-socialshare/dist/angular-socialshare.js',
    './bower_components/lodash/lodash.js',

    // Misc
    './js/misc/animate.css.js',

    // App.js
    './js/app.js',

    // Languages
    './js/languages/en.js',
    './js/languages/de.js',

    // Directives
    './js/directives/directive.js',
    './js/directives/brightcove-player.js',

    // Filters
    './js/filters/filter.js',
    './js/filters/csv-object-convertion.js',

    // Services
    './js/services/template.js',

    // Factories
    './js/factories/navigation.js',
    './js/factories/api.js',

    // Contorllers
    './js/controllers/index-controller.js',
    './js/controllers/header-controller.js',
    './js/controllers/home-controller.js',
    './js/controllers/footer-controller.js',
    './js/controllers/error-controller.js',

    // To be deleted
    './js/testJson.js',

    // Please do not change template.js
    './w/js/templates.js',
];

//Do not change anything below
//Do not change anything below
//Do not change anything below
//Do not change anything below
//Do not change anything below
//Do not change anything below

var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpSequence = require('gulp-sequence');
var clean = require('gulp-clean');
var wait = require('gulp-wait');
var connect = require("gulp-connect");
var browserSync = require("browser-sync").create();
var rename = require('gulp-rename');

var templateCacheBootstrap = "myApp.run(['$templateCache', function($templateCache) {";

gulp.task('imagemin', function () {

    var imagemin = require('gulp-imagemin');

    return gulp.src('./img/**')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }]
        }))
        .pipe(gulp.dest('./img2/'));
});

gulp.task('clean:production', function () {
    return gulp.src('./production', {
            read: false
        })
        .pipe(wait(200))
        .pipe(clean({
            force: true
        }));
});

gulp.task('clean:tmp', function () {
    return gulp.src('./tmp', {
            read: false
        })
        .pipe(wait(200))
        .pipe(clean({
            force: true
        }));
});

gulp.task('clean:w', function () {
    return gulp.src('./w', {
            read: false
        })
        .pipe(wait(200))
        .pipe(clean());
});

gulp.task('minify:css', function () {
    var replace = require('gulp-replace');
    var rename = require('gulp-rename');
    var minifyCss = require('gulp-minify-css');
    var concat = require('gulp-concat');
    return gulp.src('./w/import.css')

        .pipe(minifyCss({
            keepSpecialComments: 0,
            rebase: false
        }))
        .pipe(rename('w.css'))
        .pipe(replace('url(../', 'url('))
        .pipe(replace("url('../", "url('"))
        .pipe(replace('url("../', 'url("'))
        .pipe(gulp.dest('./w/'));
});

/* Generate and minify SASS => CSS */
gulp.task('generate:css', function () {
    var replace = require('gulp-replace');
    var rename = require('gulp-rename');
    var minifyCss = require('gulp-minify-css');
    var concat = require('gulp-concat');
    var sass = require('gulp-sass');
    gulp.src('./sass/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(rename('w.css'))
        .pipe(minifyCss({
            keepSpecialComments: 0,
            rebase: false
        }))
        .pipe(replace('url(../', 'url('))
        .pipe(replace("url('../", "url('"))
        .pipe(replace('url("../', 'url("'))
        .pipe(gulp.dest('./w'))
        .pipe(gulp.dest('./prod'))
        .pipe(gulp.dest('./test'))
        .pipe(gulp.dest('./stage'))
        .pipe(gulp.dest('./dev'));
});


gulp.task('inlinesource', function () {
    var inline = require('gulp-inline');
    return gulp.src('./w/index.html')
        .pipe(inline({
            base: './w',
            disabledTypes: ['svg', 'img'] // Only inline css files
        }))
        .pipe(gulp.dest('./w/'));
});


gulp.task('uglify:js', function () {
    var uglify = require('gulp-uglify');
    var stripDebug = require('gulp-strip-debug');
    return gulp.src('./w/w.js')
        .pipe(stripDebug())
        .pipe(uglify({
            mangle: false
        }))
        .pipe(gulp.dest('./w'));
});

gulp.task('concat:js', function () {
    var concat = require('gulp-concat');
    var replace = require('gulp-replace');
    return gulp.src(jsArray)
        .pipe(concat('w.js'))
        .pipe(gulp.dest('./w'));
});

gulp.task('templatecache', function () {
    var templateCache = require('gulp-angular-templatecache');
    return gulp.src('./w/views/**/*.html')
        .pipe(templateCache({
            root: "views/",
            templateHeader: templateCacheBootstrap
        }))
        .pipe(gulp.dest('./w/js/'));
});

gulp.task('sass:production', function () {
    var sass = require('gulp-sass');
    gulp.src('./sass/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./w'));
});

gulp.task('sass:development', function () {
    var sass = require('gulp-sass');
    var sourcemaps = require('gulp-sourcemaps');
    gulp.src('./sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css'))
        .pipe(connect.reload());
});

gulp.task('sass:serve', function () {
    var sass = require('gulp-sass');
    var sourcemaps = require('gulp-sourcemaps');
    gulp.src('./sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});

gulp.task('minify:indexproduction', function () {
    var opts = {
        conditionals: true,
        spare: true
    };
    var minifyHTML = require('gulp-minify-html');
    return gulp.src('./indexproduction.html')
        .pipe(minifyHTML(opts))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./w/'));
});

gulp.task('minify:views', function () {
    var minifyHTML = require('gulp-minify-html');
    var opts = {
        conditionals: true,
        spare: true
    };

    return gulp.src('./views/**/*.html')
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('./w/views/'));
});

gulp.task('connect:html', function () {
    gulp.src('./**/*.html')
        .pipe(connect.reload());
});

gulp.task('connect:js', function () {
    gulp.src('./js/**/*.js')
        .pipe(connect.reload());
});

gulp.task('watch:all', function () {
    var watch = require('gulp-watch');
    var open = require('gulp-open');
    connect.server({
        root: './',
        livereload: false
    });
    gulp.src(__filename)
        .pipe(open({
            uri: 'http://localhost:8080'
        }));
    gulp.watch(['./**/*.html', './sass/**/*.scss', './js/**/*.js'], ['sass:development', 'connect:html', 'connect:js']);
});


/* Production copy */
gulp.task('copy:html', function () {
    var gulpCopy = require('gulp-copy');
    return gulp.src("./w/index.html")
        .pipe(gulpCopy("./prod/", {
            prefix: 1
        }));
});

gulp.task('copy:img', function () {
    var gulpCopy = require('gulp-copy');
    return gulp.src("./img/**")
        .pipe(gulpCopy("./prod/"));
});

gulp.task('copy:fonts', function () {
    var gulpCopy = require('gulp-copy');
    return gulp.src("./fonts/**")
        .pipe(gulpCopy("./prod/"));
});

/* Css copy */
gulp.task('copy:css', function () {
    var gulpCopy = require('gulp-copy');
    return gulp.src("./w/w.css")
        .pipe(gulpCopy("./prod/", {
            prefix: 1
        }));
});

/* prod copy */
gulp.task('copy:prod', function () {
    var gulpCopy = require('gulp-copy');
    gulp.src("./w/w.js")
        .pipe(gulpCopy("./prod/", {
            prefix: 1
        }));
    gulp.src("./img/**")
        .pipe(gulpCopy("./prod/"));
    gulp.src("./fonts/**")
        .pipe(gulpCopy("./prod/"));
    gulp.src("./w/w.css")
        .pipe(gulpCopy('./prod/', {
            prefix: 1
        }));
    gulp.src('./indexproduction.html')
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./prod/'));
});

/* stage copy */
gulp.task('copy:stage', function () {
    var gulpCopy = require('gulp-copy');
    gulp.src("./w/w.js")
        .pipe(gulpCopy("./stage/", {
            prefix: 1
        }));
    gulp.src("./img/**")
        .pipe(gulpCopy("./stage/"));
    gulp.src("./fonts/**")
        .pipe(gulpCopy("./stage/"));
    gulp.src("./w/w.css")
        .pipe(gulpCopy('./stage/', {
            prefix: 1
        }));
    gulp.src('./indexproduction.html')
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./stage/'));
});

/* test copy */
gulp.task('copy:test', function () {
    var gulpCopy = require('gulp-copy');
    gulp.src("./w/w.js")
        .pipe(gulpCopy("./test/", {
            prefix: 1
        }));
    gulp.src("./img/**")
        .pipe(gulpCopy("./test/"));
    gulp.src("./fonts/**")
        .pipe(gulpCopy("./test/"));
    gulp.src("./w/w.css")
        .pipe(gulpCopy('./test/', {
            prefix: 1
        }));
    gulp.src('./indexproduction.html')
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./test/'));
});

/* dev copy */
gulp.task('copy:dev', function () {
    var gulpCopy = require('gulp-copy');
    gulp.src(["./w/w.css", "./w/w.js"])
        .pipe(gulpCopy("./dev/", {
            prefix: 1
        }));
    gulp.src(["./img/**", "./fonts/**"])
        .pipe(gulpCopy("./dev/"));
    gulp.src("./w/w.css")
        .pipe(gulp.dest('./dev/'));

    gulp.src('./indexproduction.html')
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./dev/'));
});

// Static Server + watching scss/html/js files
gulp.task('browserSync', function () {
    browserSync.init({
        port: 8080,
        server: {
            baseDir: "./",
        },
    });
    gulp.watch('./sass/**/*.scss', ['sass:serve']);
    gulp.watch(['./**/*.html', './js/**/*.js']).on('change', browserSync.reload);
});


gulp.task('default', ["sass:development", "browserSync"]);
gulp.task('watch', ["sass:development", "watch:all"]);
gulp.task('minifyhtml', ["minify:indexHTML", "minify:views", "templatecache"]);
gulp.task('copy', ["copy:img", "copy:fonts"]);
gulp.task('clean', ["clean:pImages", "clean:pFont"]);

// Use the below task to 

gulp.task('prod', gulpSequence(['clean:w'], ["generate:css", "minify:views"], 'clean:tmp', "templatecache", 'clean:tmp', "concat:js", "uglify:js", 'clean:tmp', 'copy:prod', 'clean:tmp', 'clean:tmp'));

gulp.task('stage', gulpSequence(['clean:w'], ["generate:css", "minify:views"], 'clean:tmp', "templatecache", 'clean:tmp', "concat:js", "uglify:js", 'clean:tmp', 'copy:stage', 'clean:tmp', 'clean:tmp'));

gulp.task('test', gulpSequence(['clean:w'], ["generate:css", "minify:views"], 'clean:tmp', "templatecache", 'clean:tmp', "concat:js", "uglify:js", 'clean:tmp', 'copy:test', 'clean:tmp', 'clean:tmp'));

gulp.task('dev', gulpSequence(['clean:w'], ["generate:css", "minify:views"], 'clean:tmp', "templatecache", 'clean:tmp', "concat:js", 'clean:tmp', "copy:dev", 'clean:tmp', 'clean:tmp'));