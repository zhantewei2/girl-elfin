'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.httpBase = exports.queryStringify = undefined;

var _rxjs = require('rxjs');

var _contentType = require('./contentType');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var queryStringify = exports.queryStringify = function queryStringify(obj) {
  if (!obj) return '';
  var str = '';
  for (var i in obj) {
    str += i + '=' + obj[i] + '&';
  }
  return str.slice(0, -1);
};

var httpBase = exports.httpBase = function httpBase() {
  _classCallCheck(this, httpBase);

  this.send = function (method, address, params) {
    var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    method = method.toUpperCase();
    if (params && method === 'GET') address = address + '?' + queryStringify(params);
    var xhr = new XMLHttpRequest();

    var sendQuery = '';

    return _rxjs.Observable.create(function (ob) {
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 0) {
            console.error('Connect failure,status:' + xhr.status);
            return ob.error('err');
          }
          ob.next({ status: xhr.status, content: xhr.responseText });
        }
      };
      if (method !== 'GET') {
        var r = (0, _contentType.ContentType)(params);
        sendQuery = r.params;
        headers = r.type ? Object.assign({ 'Content-Type': r.type }, headers) : headers;
      }
      //unsubscribe abort xhr:
      var old = ob.unsubscribe;
      ob.unsubscribe = function () {
        xhr.abort();
        old.call(ob);
      };

      //send msg:
      xhr.open(method, address);
      xhr.withCredentials = true;
      for (var i in headers) {
        xhr.setRequestHeader(i, headers[i]);
      }

      xhr.send(sendQuery);
    });
  };
};