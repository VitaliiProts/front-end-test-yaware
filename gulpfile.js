const
  gulp = require("gulp"),
  sync = require("browser-sync").create(),
  plugins = require("gulp-load-plugins")({
    scope: ["devDependencies"]
  }),
  swallowError = function () {
    return plugins.plumber(function (error) {
      console.error("ERROR: " + error.message);
      this.emit('end');
    });
  },

  htmlExtend = require("gulp-html-extend"),
  del = require("del"),
  sass = require("gulp-sass"),
  eslint = require("gulp-eslint"),

  IS_DEVELOPMENT = true,
  DIST_DIR = "dist",
  CSS_DIST_DIR = DIST_DIR + "/css",
  JS_DIST_DIR = DIST_DIR + "/js",
  FONTS_DIST_DIR = DIST_DIR + "/fonts",
  IMAGES_DIST_DIR = DIST_DIR + "/images";


gulp.task("clean", function () {
  return del.sync('dist');
});

gulp.task("html", function () {
  return gulp.src("src/pages/**/*.html")
    .pipe(swallowError())
    .pipe(htmlExtend())
    .pipe(gulp.dest(DIST_DIR));
});

gulp.task("css:app", function () {
  return gulp.src([
    "src/styles/**/*.sass",
    "src/styles/**/*.scss"
  ])
    .pipe(swallowError())
    .pipe(plugins.if(IS_DEVELOPMENT, plugins.sourcemaps.init()))
    .pipe(plugins.sass())
    .pipe(plugins.cssnano())
    .pipe(plugins.rename({suffix: ".min"}))
    .pipe(plugins.if(IS_DEVELOPMENT, plugins.sourcemaps.write()))
    .pipe(gulp.dest(CSS_DIST_DIR))
    .pipe(sync.stream());
});

gulp.task("css:vendor", function () {
  return gulp.src([
    "node_modules/bootstrap/dist/css/bootstrap.css",
    "node_modules/normalize.css/normalize.css",
    "node_modules/font-awesome/css/font-awesome.css",
    "node_modules/multiselect/css/multi-select.css"
  ])
    .pipe(swallowError())
    .pipe(plugins.if(IS_DEVELOPMENT, plugins.sourcemaps.init()))
    .pipe(plugins.if(!IS_DEVELOPMENT, plugins.cssnano()))
    .pipe(plugins.concat("vendor.min.css"))
    .pipe(plugins.if(IS_DEVELOPMENT, plugins.sourcemaps.write()))
    .pipe(gulp.dest(CSS_DIST_DIR))
    .pipe(sync.stream());
});

gulp.task("js:app", function () {
  return gulp.src("src/js/*.js")
    .pipe(swallowError())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(plugins.if(IS_DEVELOPMENT, plugins.sourcemaps.init()))
    .pipe(plugins.concat("app.min.js"))
    .pipe(plugins.if(!IS_DEVELOPMENT, plugins.uglify()))
    .pipe(plugins.if(IS_DEVELOPMENT, plugins.sourcemaps.write()))
    .pipe(gulp.dest(JS_DIST_DIR));
});

gulp.task("js:vendor", function () {
  return gulp.src([
    "node_modules/jquery/dist/jquery.js",
    "node_modules/bootstrap/dist/js/bootstrap.js",
    "node_modules/multiselect/js/jquery.multi-select.js"
  ])
    .pipe(swallowError())
    .pipe(plugins.if(IS_DEVELOPMENT, plugins.sourcemaps.init()))
    .pipe(plugins.concat("vendor.min.js"))
    .pipe(plugins.if(!IS_DEVELOPMENT, plugins.uglify()))
    .pipe(plugins.if(IS_DEVELOPMENT, plugins.sourcemaps.write()))
    .pipe(gulp.dest(JS_DIST_DIR));
});

gulp.task("fonts:app", function () {
  return gulp.src([
    "src/fonts/*"
  ])
    .pipe(swallowError())
    .pipe(gulp.dest(FONTS_DIST_DIR));
});

gulp.task("fonts:vendor", function () {
  return gulp.src([
    "node_modules/bootstrap/dist/fonts/*",
    "node_modules/bootstrap/dist/fonts/*",
    "node_modules/font-awesome/fonts/*"
  ])
    .pipe(swallowError())
    .pipe(gulp.dest(FONTS_DIST_DIR));
});

gulp.task("images:app", function () {
  return gulp.src([
    "src/img/**/*.*",
    "node_modules/multiselect/img/switch.png"
  ])
    .pipe(swallowError())
    .pipe(plugins.if(!IS_DEVELOPMENT, plugins.imagemin()))
    .pipe(gulp.dest(IMAGES_DIST_DIR));
});

gulp.task("css", ["css:app", "css:vendor"]);
gulp.task("js", ["js:app", "js:vendor"]);
gulp.task("assets", ["fonts:app", "fonts:vendor", "images:app"]);

gulp.task("build", ["clean", "html", "js", "css", "assets"]);

gulp.task("watch", ["build"], function () {
  sync.init({
    server: DIST_DIR,
    notify: false
  });

  gulp.watch("src/**/*.html", ["html"]);
  gulp.watch(['src/styles/**/*.sass', 'src/styles/**/*.scss'], ['css:app']);
  // gulp.watch("src/styles/**/*.sass", ["css:app"]);
  gulp.watch("src/js/*.js", ["js:app"]);

  gulp.watch(DIST_DIR + "/*.html").on("change", sync.reload);
  gulp.watch(JS_DIST_DIR + "/*.js").on("change", sync.reload);
});

gulp.task("default", ["build", "watch"]);