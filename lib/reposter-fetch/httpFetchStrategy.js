'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _util = require('../util');

var pickOptions = function pickOptions(_ref) {
  var uri = _ref.uri;
  var method = _ref.method;

  if (!uri) {
    throw new Error('pickOptions: uri option is required');
  }

  if (!method) {
    throw new Error('pickOptions: method option is required');
  }

  return { uri: uri, method: method };
};

function httpFetchStrategy(options, eventBus, sourceID) {
  eventBus.emit('sourceStateChange', sourceID, { type: 'http_fetch',
    total: 1 });

  return {
    fetch: function fetch() {
      return (0, _util.makeRequest)({
        uri: options.uri,
        method: options.method
      }).then(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2);

        var request = _ref3[0];
        var body = _ref3[1];

        eventBus.emit('sourceStateProgress', sourceID);
        return body;
      }).catch(function (error) {
        throw error;
      });
    }
  };
}

httpFetchStrategy.pickOptions = pickOptions;

exports.default = httpFetchStrategy;