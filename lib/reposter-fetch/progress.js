'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProgressBar = require('progress');


function progress(eventBus) {
  var sources = {};
  var COLORS = (0, _util.cycled)((0, _util.shuffle)([_chalk2.default.red, _chalk2.default.green, _chalk2.default.yellow, _chalk2.default.blue, _chalk2.default.magenta, _chalk2.default.cyan, _chalk2.default.white, _chalk2.default.gray]));

  var barFormat = function barFormat(sourceID, state) {
    return '⇨ ' + _chalk2.default.bold(sourceID) + ' (:current/:total) ' + _chalk2.default.underline(state);
  };

  var callback = function afterFinish(bar) {
    bar.stream.moveCursor(0, -1);
  };

  return {
    listen: function listen() {
      eventBus.on('initializeSource', function (sourceID) {
        var color = COLORS.next();
        sources[sourceID] = {
          color: color,
          bar: new ProgressBar(color(barFormat(sourceID, 'init')), { total: 1, callback: callback })
        };
        sources[sourceID].bar.tick();
      });

      eventBus.on('sourceStateChange', function (sourceID, newState) {
        var _sources$sourceID = sources[sourceID];
        var color = _sources$sourceID.color;
        var bar = _sources$sourceID.bar;

        bar.terminate();
        sources[sourceID].bar = new ProgressBar(color(barFormat(sourceID, newState.type)), { total: newState.total, callback: callback });
      });

      eventBus.on('sourceStateProgress', function (sourceID) {
        var bar = sources[sourceID].bar;

        bar.tick();
      });
    }
  };
}

exports.default = progress;