const gulp = require('gulp');
const browserify = require('browserify');
const sourcemaps = require('gulp-sourcemaps');
const less = require('gulp-less');
const livereload = require('gulp-livereload');
const nodemon = require('gulp-nodemon');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

gulp.task('default', ['less', 'js', 'html', 'json']);

gulp.task('watch', ['json'], () => {
    livereload.listen();
    nodemon({
        script: 'app.js',
        watch: 'dist',
    });
    gulp.watch('src/less/**/*.less', ['less']);
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/index.html', ['html']);
});

gulp.task('less', () => {
    gulp.src('src/less/styles.less')
        .pipe(less())
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('js', () => {
    browserify({
        entries: 'src/js/script.js',
        debug: true,
    })
        .bundle()
        .pipe(source('script.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('html', () => {
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('json', () => {
    gulp.src('src/json/input.json')
        .pipe(gulp.dest('dist'));
});
