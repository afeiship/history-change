declare var wx: any;

const HistoryChange = (): void => {
  console.log('hello');
};

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = HistoryChange;
}

export default HistoryChange;
