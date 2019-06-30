"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CappedMap = exports.CappedMap = function CappedMap() {
  var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
  var skip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

  _classCallCheck(this, CappedMap);

  var store = new Map(),
      totalLimit = limit + skip,
      useCount = 0,
      handleOverflow = function handleOverflow() {
    if (useCount >= totalLimit) {
      var deleteCount = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = store.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var i = _step.value;

          store.delete(i);
          if (++deleteCount >= skip) {
            useCount = limit;
            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  },
      _set = store.set;
  store.set = function (key, value) {
    handleOverflow();
    _set.call(store, key, value);
    useCount++;
  };
  return store;
};