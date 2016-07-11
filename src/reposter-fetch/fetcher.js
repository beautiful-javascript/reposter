import Promise from 'bluebird';

function fetcher() {
  return {
    fetch(sources, eventBus) { 
      return Promise.reduce(sources, (partialResult, source) => {
        const fetchStrategy = source.fetchStrategy(source.fetchStrategyOptions, 
                                                   eventBus, source.id);
        const parser = source.parser(source.parserOptions,
                                     eventBus,
                                     source.id);

        return fetchStrategy.fetch().
                 then(parser.parse).
                 then(docs => {
                   return [...partialResult, ...docs];
                 }); 
      }, []);
    }
  };
}

export default fetcher;
