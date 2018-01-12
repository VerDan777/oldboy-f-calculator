const gulp = require('gulp');
const sass = require('gulp-sass');
const sassImporter = require('sass-module-importer');
const notify = require('gulp-notify');

gulp.task('styles', () => {
    return gulp.src('./src/sass/**/*.scss')
    .pipe(sass({ importer: sassImporter() }))
    .on('error', notify.onError(function(error) {
        return {
            title: 'Styles',
            message: error.message
        }
    }))
    .pipe(gulp.dest('./dist'));
});