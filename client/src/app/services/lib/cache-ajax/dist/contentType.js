'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var ContentType = exports.ContentType = function ContentType(params) {
	var type = void 0;
	try {
		if (params instanceof Object) {
			if (params instanceof FormData) {} else if (params instanceof ArrayBuffer) {
				type = 'application/octet-stream';
			} else {
				params = JSON.stringify(params);
				type = 'application/json';
			}
		}
	} catch (err) {}
	return { params: params, type: type };
};