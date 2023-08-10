# history-change
> Detect history/url change.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install @jswork/history-change
```

## use in app
```js
import HistoryChange from '@jswork/history-change';

// app init
HistoryChange.init('hash');

// listen
window.addEventListener('historychange', (e) => {
  const { action, payload } = e.detail;
  console.log('action/history :', action, payload.history);
});
```

## usage in browser
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>HistoryChange online version</title>
    <script src="https://unpkg.com/@jswork/history-change"></script>
  </head>
  <body>
    <nav>
      <a href="#1">111</a>
      <a href="#2">222</a>
      <a href="#3">333</a>
      <a href="#4">444</a>
    </nav>
    <script>
      HistoryChange.init('hash');

      window.addEventListener('historychange', (e) => {
        const { action, history } = e.detail;
        console.log('action/history :', action, history);
      });
    </script>
  </body>
</html>
```

## license
Code released under [the MIT license](https://github.com/afeiship/history-change/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/history-change
[version-url]: https://npmjs.org/package/@jswork/history-change

[license-image]: https://img.shields.io/npm/l/@jswork/history-change
[license-url]: https://github.com/afeiship/history-change/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/history-change
[size-url]: https://github.com/afeiship/history-change/blob/master/dist/history-change.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/history-change
[download-url]: https://www.npmjs.com/package/@jswork/history-change
