const gulp = require('gulp');
const { CleanRegistry, TsScripts } = require('@jswork/gulp-registry');

const task1 = new CleanRegistry();
const task2 = new TsScripts({
  umdOptions: {
    exports: () => 'HistoryChange',
    namespace: () => 'HistoryChange',
  },
});

[task1, task2].forEach(gulp.registry);

gulp.task('default', gulp.series(['clean', 'ts:scripts:typing', 'ts:scripts:umd']));
