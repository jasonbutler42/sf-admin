// Include gulp
var gulp = require('gulp');

//Include Plugins
var flatten = require('gulp-flatten');
var gulpFilter = require('gulp-filter');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var mainBowerFiles = require('main-bower-files');

var config = {
    bowerComponentsDir: './bower_components',
    //bootstrapDir: config.bowerComponentsDir + '/bootstrap-sass',
    publicDir: './public',
    sourceDir: './src',
};

gulp.task('publish-components', function() {

    var jsFilter = gulpFilter('**/*.js', {restore: true}),
        cssFilter = gulpFilter('**/*.css', {restore: true});
        console.log(jsFilter);
    return gulp.src(mainBowerFiles())

    // grab vendor js files from bower_components, minify and push in /public
    .pipe(jsFilter)
    .pipe(gulp.dest(config.publicDir + '/js'))
    .pipe(uglify())
    .pipe(rename({
        suffix: ".min"
    }))
    .pipe(gulp.dest(config.publicDir + '/js'))
    .pipe(jsFilter.restore)

    // grab vendor css files from bower_components, minify and push in /public
    .pipe(cssFilter)
    .pipe(gulp.dest(config.publicDir + '/css'))
    .pipe(minifycss())
    .pipe(rename({
        suffix: ".min"
    }))
    .pipe(gulp.dest(config.publicDir + '/css'))
    .pipe(cssFilter.restore);
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src(config.sourceDir + '/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src(config.sourceDir + '/scss/*.scss')
        .pipe(sass({
                includePaths: [config.bowerComponentsDir + '/bootstrap-sass/assets/stylesheets'],
		    	//includePaths: [config.bowerComponentsDir + '/bootstrap-star-rating/css'],
		    }))
        .pipe(gulp.dest(config.publicDir + '/css'));
});

gulp.task('fonts', function() {
    return gulp.src(config.bowerComponentsDir + '/bootstrap-sass/assets/fonts/**/*')
    .pipe(gulp.dest(config.publicDir + '/fonts'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(config.sourceDir + '/**/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest(config.publicDir + '/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.publicDir + '/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(config.sourceDir + '/**/*.js', ['lint', 'scripts']);
    gulp.watch(config.sourceDir + '/scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);