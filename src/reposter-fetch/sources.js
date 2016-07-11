import * as qs from 'querystring';

import sitemapDataParser from './sitemapDataParser';
import httpFetchStrategy from './httpFetchStrategy';
import fileFetchStrategy from './fileFetchStrategy';

import source from './source';

function sources(eventBus) {
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

				eventBus.emit('initializeSource', sourceString);

        return source(sourceString, 
                      fetchStrategyOptions,
                      parserOptions,
                      fetchStrategy,
                      parser);
      });
    }
  };
}

export default sources;
