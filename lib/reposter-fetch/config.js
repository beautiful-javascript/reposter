'use strict';

Object.defineProperty(exports, "__esModule", {
                     value: true
});

var _yargs = require('yargs');

var yargs = _interopRequireWildcard(_yargs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var config = function config() {
                     var config = yargs.alias('s', 'sources').alias('o', 'out_file').describe('o', 'file name for the output').describe('s', 'specify sources for ' + 'your reposting campaign. ').demand(['sources', 'out_file']).usage('Usage: $0 --sources [source1] [source2]...' + ' --out_file [filename]').array('sources').argv;

                     return config;
};

exports.default = config;