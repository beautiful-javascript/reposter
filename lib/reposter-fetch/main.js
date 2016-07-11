'use strict';

require('babel-polyfill');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _sources = require('./sources');

var _sources2 = _interopRequireDefault(_sources);

var _fetcher = require('./fetcher');

var _fetcher2 = _interopRequireDefault(_fetcher);

var _writer = require('./writer');

var _writer2 = _interopRequireDefault(_writer);

var _progress = require('./progress');

var _progress2 = _interopRequireDefault(_progress);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EventEmitter = require('events');

var _console = console;
var log = _console.log;


var reposter = function reposter(config) {
  var eventBus = new EventEmitter();
  var progressBars = (0, _progress2.default)(eventBus);

  log(_chalk2.default.blue.bold('─────────────────────'));
  log(_chalk2.default.blue.bold('★ Reposter - Fetch ★'));
  log(_chalk2.default.blue.bold('─────────────────────'));
  log();
  log(_chalk2.default.white('❯ Processing sources...'));

  progressBars.listen();

  var parsedSources = (0, _sources2.default)(eventBus).fromOptions(config.sources);

  (0, _fetcher2.default)().fetch(parsedSources, eventBus).then(function (docs) {
    log(_chalk2.default.yellow('✔ Gathered ' + docs.length + ' articles.'));
    log(_chalk2.default.white('❯ Writing output to ' + config.out_file + '...'));
    (0, _writer2.default)().write(docs, config.out_file);
  });
};

reposter((0, _config2.default)());