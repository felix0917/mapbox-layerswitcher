"use strict";

const gulp = require("gulp");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const minifyCss = require('gulp-minify-css')
const clean = require("gulp-clean");

gulp.task("build-min-js", (done) => {
  gulp
    .src(['src/**/*.js'])
    .pipe(
      babel({
        presets: ["es2015"],
      })
    )
    .pipe(concat("mapbox-layerswitcher.min.js"))
    .pipe(
      uglify({
        mangle: true,
        compress: true,
      })
    )
    .pipe(gulp.dest("build"));
  done();
});

gulp.task("build-min-css", (done) => {
  gulp
    .src(['src/**/*.css', '!src/assets/index.css'])
    .pipe(concat("mapbox-layerswitcher.min.css"))
    .pipe(minifyCss())
    .pipe(gulp.dest("build"));
  done();
});

gulp.task("clean", (done) => {
  gulp.src("./build").pipe(clean());
  done();
});

gulp.task(
  "build",
  gulp.series(["build-min-js"], ["build-min-css"])
);