'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function fetcher() {
  return {
    fetch: function fetch(sources) {
      return _bluebird2.default.reduce(sources, function (partialResult, source) {
        var fetchStrategy = source.fetchStrategy(source.fetchStrategyOptions);
        var parser = source.parser(source.parserOptions);

        return fetchStrategy.fetch().then(parser.parse).then(function (docs) {
          return [].concat(_toConsumableArray(partialResult), _toConsumableArray(docs));
        });
      }, []);
    }
  };
}

exports.default = fetcher;