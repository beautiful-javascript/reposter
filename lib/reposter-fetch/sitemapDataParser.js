'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _util = require('../util');

var _xmlStream = require('xml-stream');

var _xmlStream2 = _interopRequireDefault(_xmlStream);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _document = require('./document');

var _document2 = _interopRequireDefault(_document);

var _striptags = require('striptags');

var _striptags2 = _interopRequireDefault(_striptags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var pickOptions = function pickOptions(options) {
  var defaults = {
    sitemapLimit: 50000,
    minPriority: 0.8
  };

  return _extends({}, defaults, (0, _util.pick)(options, ['sitemapLimit', 'minPriority']));
};

function sitemapDataParser(options, eventBus, sourceID) {
  return {
    parse: function parse(data) {
      var dataStream = (0, _util.streamify)(data);
      var parser = new _xmlStream2.default(dataStream);
      var priorityThreshold = parseFloat(options.minPriority);

      eventBus.emit('sourceStateChange', sourceID, { type: 'sitemap_parse', total: 1 });

      return new _bluebird2.default(function (resolve, reject) {
        var pendingURIs = [];
        parser.on('text: url > loc', function (element) {
          var uri = element.$text;
          pendingURIs = [].concat(_toConsumableArray(pendingURIs), [uri]);
        });

        parser.on('text: url > priority', function (element) {
          var priority = parseFloat(element.$text);

          if (priority < priorityThreshold) {
            pendingURIs = pendingURIs.slice(0, -1);
          }
        });

        parser.on('error', function (err) {
          reject(err);
        });

        parser.on('end', function () {
          eventBus.emit('sourceStateProgress', sourceID);
          eventBus.emit('sourceStateChange', sourceID, { type: 'title_fetch',
            total: pendingURIs.length });

          _bluebird2.default.reduce(pendingURIs, function (partialResult, uri) {
            return (0, _util.makeRequest)({ uri: uri, method: 'get' }).then(function (_ref) {
              var _ref2 = _slicedToArray(_ref, 2);

              var request = _ref2[0];
              var body = _ref2[1];

              var title = (0, _striptags2.default)(body.match(/<title>(.*)\<\/title>/)[1]);
              eventBus.emit('sourceStateProgress', sourceID);

              return [].concat(_toConsumableArray(partialResult), [(0, _document2.default)(uri, title)]);
            });
          }, []).then(resolve);
        });
      });
    }
  };
}

sitemapDataParser.pickOptions = pickOptions;

exports.default = sitemapDataParser;