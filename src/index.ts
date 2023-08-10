import hash from './lib/hash';

declare var wx: any;

const HistoryChange = {
  hash,
};

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = HistoryChange;
}

export default HistoryChange;
