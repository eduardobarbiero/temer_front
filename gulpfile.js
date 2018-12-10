var gulp = require('gulp');
var replace = require('gulp-replace');

// Altera url de API para Desenvolvimento
gulp.task('dev', function () {
    gulp.src(['./src/configs/index.js'])
        .pipe(replace(/(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim, function (match, p1, offset, string) {
            return match.endsWith("/api") ? "http://localhost:3000/api" : "http://localhost:3000";
        }))
        .pipe(gulp.dest('./src/configs/'));
});

// Altera url de API para Produção
gulp.task('production', function () {
    gulp.src(['./src/configs/index.js'])
        .pipe(replace(/(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim, function (match, p1, offset, string) {
            return match.endsWith("/api") ? "http://temerapi-env.jjmakiairp.us-east-1.elasticbeanstalk.com/api" : "http://temerapi-env.jjmakiairp.us-east-1.elasticbeanstalk.com";
        }))
        .pipe(gulp.dest('./src/configs/'));
});