// @thanks to: https://gist.github.com/sstephenson/739659
// https://support.mozilla.org/de/questions/1365380
// https://stackoverflow.com/questions/37270625/how-can-i-get-the-url-of-the-previous-page-when-triggering-the-popstate-event
declare var define: any;

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS
    module.exports = factory();
  } else {
    // Browser global
    root.HistoryChange = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  const HOOKS = {
    hash: {
      event: 'hashchange',
      publicEvent: 'hash2change',
      route() {
        return location.hash.slice(1);
      },
    },
    browser: {
      event: 'popstate',
      publicEvent: 'state2change',
      route() {
        return location.pathname;
      },
    },
  };

  class HistoryChange {
    private storeKey: string;
    private routerType: string;
    private eventName: string;
    private publicEvent: string;

    public static init(routerType: string) {
      const historyChange = new HistoryChange(routerType);
      historyChange.init();
    }

    constructor(inRouterType) {
      this.routerType = inRouterType;
      this.eventName = HOOKS[this.routerType].event;
      this.publicEvent = HOOKS[this.routerType].publicEvent;
      this.storeKey = `${location.host}@history`;
    }

    init() {
      window.addEventListener(
        this.eventName,
        this.detectBackOrForward(({ action, theHistory, newURL, oldURL }) => {
          const route = theHistory[theHistory.length - 1];
          const data = {
            detail: {
              action,
              routerType: this.routerType,
              payload: {
                newURL,
                oldURL,
                route,
                history: theHistory,
              },
            },
          };

          const cusEvent = new CustomEvent(this.publicEvent, data);
          const cusHistoryEvent = new CustomEvent('historychange', data);

          window.dispatchEvent(cusEvent);
          window.dispatchEvent(cusHistoryEvent);
        })
      );
    }

    detectBackOrForward(onChange) {
      const cache = sessionStorage.getItem(this.storeKey);
      const route = HOOKS[this.routerType].route();
      let theHistory = cache ? JSON.parse(cache) : [route];
      let historyLength = window.history.length;
      let oldURL = window.location.href;

      return () => {
        const route = HOOKS[this.routerType].route();
        const length = window.history.length;
        const isBackOrReplace = historyLength == length;
        const newURL = window.location.href;

        if (theHistory.length && isBackOrReplace) {
          if (theHistory[theHistory.length - 2] == route) {
            theHistory = theHistory.slice(0, -1);
            onChange({ action: 'back', theHistory, oldURL, newURL });
          } else {
            // theHistory.push(route);
            theHistory[theHistory.length - 1] = route;
            onChange({ action: 'replace', theHistory, oldURL, newURL });
          }
        } else {
          theHistory.push(route);
          historyLength = length;
          onChange({ action: 'forward', theHistory, oldURL, newURL });
        }

        // sync actions:
        oldURL = newURL;
        this.syncHistory(theHistory);
      };
    }

    syncHistory(list: string[]) {
      sessionStorage.setItem(this.storeKey, JSON.stringify(list));
    }
  }

  return HistoryChange;
});
