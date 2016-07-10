import * as qs from 'querystring';
import uuid from 'node-uuid';

import sitemapDataParser from './sitemapDataParser';
import httpFetchStrategy from './httpFetchStrategy';
import fileFetchStrategy from './fileFetchStrategy';

import source from './source';

function sources() {
  const typeToParser = {
    sitemap: sitemapDataParser,
  };

  const typeToFetchStrategy = {
    http: httpFetchStrategy,
    file: fileFetchStrategy
  };

  return {
    fromOptions(options) {
      return options.map(sourceString => {
        const parserTypeSep = sourceString.indexOf(':');
        const fetchStrategyTypeSep = sourceString.indexOf(':', parserTypeSep + 1);

        if (parserTypeSep === -1 || 
            fetchStrategyTypeSep === -1) {
          throw new Error(`Invalid source string: ${sourceString}`);
        }

        const parserType = sourceString.slice(0, parserTypeSep);
        const fetchStrategyType = sourceString.slice(parserTypeSep + 1, 
                                                     fetchStrategyTypeSep);
        const optionsString = sourceString.slice(fetchStrategyTypeSep + 1);

        const options = qs.parse(optionsString, ';');

        const parser = typeToParser[parserType];
        const fetchStrategy = typeToFetchStrategy[fetchStrategyType];

        const parserOptions = parser.pickOptions(options);
        const fetchStrategyOptions = fetchStrategy.pickOptions(options);

        return source(uuid.v4(), 
                      fetchStrategyOptions,
                      parserOptions,
                      fetchStrategy,
                      parser);
      });
    }
  };
}

export default sources;
