gulp-trim
=========

Remove the whitespace from the beginning and end of a content.

Usage
-------

1. Install `gulp-trim` as dependency:

```
npm install gulp-trim --save-dev
```

2. Edit your `gulpfile`:

```js
var trim = require('gulp-trim');

gulp.task('mytask', function() {
  gulp.src('src/file.txt')
    .pipe(trim())
    .pipe(gulp.dest('trimmed'));
});
```
