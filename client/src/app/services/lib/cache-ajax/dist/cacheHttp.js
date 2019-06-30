'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CacheHttp = undefined;
exports.toKey = toKey;

var _cappedMap = require('./cappedMap');

var _zhttp = require('./zhttp');

var _rxjs = require('rxjs');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function toKey(url, params) {
  return url + '?' + JSON.stringify(params);
}

var CacheHttp = exports.CacheHttp = function CacheHttp() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _expires = _ref._expires,
      limit = _ref.limit,
      skip = _ref.skip;

  var filter = arguments[1];

  _classCallCheck(this, CacheHttp);

  var http = new _zhttp.httpBase(),
      store = new _cappedMap.CappedMap(limit, skip),
      pendingQueue = [],
      saveData = function saveData(key, data, expires) {
    store.set(key, {
      data: data,
      expiresDate: new Date().getTime() + expires * 60000
    });
  },
      getData = function getData(key) {
    var result = store.get(key);
    if (!result) return null;
    return result.expiresDate < new Date().getTime() ? null : result.data;
  },
      removePending = function removePending(key) {
    var index = pendingQueue.findIndex(function (item) {
      return item.key === key;
    });
    if (index !== -1) pendingQueue.splice(index, 1);
  };

  this.xhr = function (method, url, params) {
    var _ref2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
        expires = _ref2.expires,
        headers = _ref2.headers,
        key = _ref2.key;

    return _rxjs.Observable.create(function (ob) {
      expires = expires || _expires;
      key = key || toKey(url, params);
      var storeResult = getData(key);
      if (storeResult) return ob.next(storeResult);

      var pending = pendingQueue.find(function (pendingItem) {
        return pendingItem.key === key;
      });
      if (pending) return pending.run = function (result) {
        return ob.next(result);
      };
      var pendingItem = {
        key: key,
        run: null
      };
      pendingQueue.push(pendingItem);

      //send xhr:
      var endErr = function endErr(err) {
        removePending(key);
        ob.error(err);
      };

      var sendOrder = http.send(method, url, params, headers).subscribe(function (result) {
        var end = function end(filterResult) {
          if (expires) saveData(key, filterResult, expires);
          removePending(key);
          pendingItem.run ? pendingItem.run(filterResult) : ob.next(filterResult);
        };
        if (filter) {

          filter(result, function (_ref3) {
            var _params = _ref3._params,
                _headers = _ref3._headers;
            return http.send(method, url, _params || params, _headers || headers);
          }).then(end).catch(endErr);
        } else {
          end(result);
        }
      }, endErr);

      //redefine unsubscribe:
      var oldUnsubscribe = ob.unsubscribe;
      ob.unsubscribe = function () {
        removePending(key);
        sendOrder.unsubscribe();
        oldUnsubscribe.call(ob);
      };
    });
  };
};