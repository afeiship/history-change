const storeKey = `${location.host}@history`;
const syncHistory = (list: string[]) => sessionStorage.setItem(storeKey, JSON.stringify(list));
const EVENT_NAME = 'hash2change';

// @thanks to: https://gist.github.com/sstephenson/739659
// https://support.mozilla.org/de/questions/1365380

const detectBackOrForward = function (onChange) {
  const cache = sessionStorage.getItem(storeKey);
  let hashHistory = cache ? JSON.parse(cache) : [window.location.hash];
  let historyLength = window.history.length;

  return function (event) {
    const hash = window.location.hash;
    const length = window.history.length;

    if (hashHistory.length && historyLength == length) {
      if (hashHistory[hashHistory.length - 2] == hash) {
        hashHistory = hashHistory.slice(0, -1);
        onChange({ action: 'back', hashHistory, event });
      } else {
        hashHistory.push(hash);
        onChange({ action: 'forward', hashHistory, event });
      }
    } else {
      hashHistory.push(hash);
      historyLength = length;
      onChange({ action: 'forward', hashHistory, event });
    }

    syncHistory(hashHistory);
  };
};

// main
export default () => {
  window.addEventListener(
    'hashchange',
    detectBackOrForward(({ action, hashHistory, event }) => {
      const { newURL, oldURL } = event;
      const hash = hashHistory[hashHistory.length - 1];
      const cusEvent = new CustomEvent(EVENT_NAME, {
        detail: {
          type: 'hash',
          action,
          payload: {
            newURL,
            oldURL,
            hash,
            history: hashHistory,
          },
        },
      });
      window.dispatchEvent(cusEvent);
    })
  );
};
