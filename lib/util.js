'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeRequest = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.pick = pick;
exports.streamify = streamify;
exports.range = range;

var _stream = require('stream');

var stream = _interopRequireWildcard(_stream);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function pick(obj, keys) {
  return Object.keys(obj).reduce(function (result, key) {
    if (keys.includes(key)) {
      return _extends(_defineProperty({}, key, obj[key]), result);
    }

    return result;
  }, {});
};

var makeRequestWithCallback = function makeRequestWithCallback(options, cb) {
  return (0, _request2.default)(options, function (err, response, body) {
    if (err) {
      return cb(err, null);
    }

    if (response.statusCode > 299) {
      return cb(new Error('error status code: ' + response.statusCode + ' ' + ('(opts: ' + JSON.stringify(options) + ')')), null);
    }

    return cb(null, response, body);
  });
};

var makeRequest = exports.makeRequest = _bluebird2.default.promisify(makeRequestWithCallback, { multiArgs: true });

function streamify(text) {
  var readable = new stream.Readable();
  readable.push(text);
  readable.push(null);
  return readable;
};

function range(s, e) {
  var res = [];
  for (var i = s; i < e; ++i) {
    res.push(i);
  }
  return res;
}