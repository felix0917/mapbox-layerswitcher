"use strict";

const gulp = require("gulp");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const clean = require("gulp-clean");
const child_exec = require("child_process").exec;

let srcFiles = [
  "src/*.js",
  "!assets",
];
let apiFiles = ["docs/**/*"];
let assetsFiles = ["src/assets/**/*"];

gulp.task("build-min-js", (done) => {
  gulp
    .src(srcFiles)
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

gulp.task("build-js", (done) => {
  gulp
    .src(srcFiles)
    .pipe(
      babel({
        presets: ["es2015"],
      })
    )
    .pipe(concat("mapbox-layerswitcher.js"))
    .pipe(gulp.dest("build"));
  done();
});

gulp.task("clean", (done) => {
  gulp.src("./build").pipe(clean());
  done();
});

gulp.task("copy-assets", (done) => {
  gulp.src(assetsFiles).pipe(gulp.dest("build/assets"));
  done();
});

gulp.task(
  "build",
  gulp.series(["build-min-js", "build-js", "copy-assets"])
);