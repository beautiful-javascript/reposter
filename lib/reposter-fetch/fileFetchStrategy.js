"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function fileFetchStrategy(options) {
  return {
    fetch: function fetch() {
      return options;
    }
  };
}

var pickOptions = function pickOptions(_ref) {
  var file = _ref.file;

  if (!file) {
    throw new Error("pickOptions: file option is required.");
  }

  return { file: file };
};

fileFetchStrategy.pickOptions = pickOptions;

exports.default = fileFetchStrategy;