'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _querystring = require('querystring');

var qs = _interopRequireWildcard(_querystring);

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _sitemapDataParser = require('./sitemapDataParser');

var _sitemapDataParser2 = _interopRequireDefault(_sitemapDataParser);

var _httpFetchStrategy = require('./httpFetchStrategy');

var _httpFetchStrategy2 = _interopRequireDefault(_httpFetchStrategy);

var _fileFetchStrategy = require('./fileFetchStrategy');

var _fileFetchStrategy2 = _interopRequireDefault(_fileFetchStrategy);

var _source = require('./source');

var _source2 = _interopRequireDefault(_source);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function sources() {
  var typeToParser = {
    sitemap: _sitemapDataParser2.default
  };

  var typeToFetchStrategy = {
    http: _httpFetchStrategy2.default,
    file: _fileFetchStrategy2.default
  };

  return {
    fromOptions: function fromOptions(options) {
      return options.map(function (sourceString) {
        var parserTypeSep = sourceString.indexOf(':');
        var fetchStrategyTypeSep = sourceString.indexOf(':', parserTypeSep + 1);

        if (parserTypeSep === -1 || fetchStrategyTypeSep === -1) {
          throw new Error('Invalid source string: ' + sourceString);
        }

        var parserType = sourceString.slice(0, parserTypeSep);
        var fetchStrategyType = sourceString.slice(parserTypeSep + 1, fetchStrategyTypeSep);
        var optionsString = sourceString.slice(fetchStrategyTypeSep + 1);

        var options = qs.parse(optionsString, ';');

        var parser = typeToParser[parserType];
        var fetchStrategy = typeToFetchStrategy[fetchStrategyType];

        var parserOptions = parser.pickOptions(options);
        var fetchStrategyOptions = fetchStrategy.pickOptions(options);

        return (0, _source2.default)(_nodeUuid2.default.v4(), fetchStrategyOptions, parserOptions, fetchStrategy, parser);
      });
    }
  };
}

exports.default = sources;