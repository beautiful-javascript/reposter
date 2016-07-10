"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function source(id, fetchStrategyOptions, parserOptions, fetchStrategy, parser) {
  return {
    id: id,
    fetchStrategyOptions: fetchStrategyOptions,
    parserOptions: parserOptions,
    fetchStrategy: fetchStrategy,
    parser: parser
  };
}

exports.default = source;