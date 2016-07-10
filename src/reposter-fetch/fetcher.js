import Promise from 'bluebird';

function fetcher() {
  return {
    fetch(sources) { 
      return Promise.reduce(sources, (partialResult, source) => {
        const fetchStrategy = source.fetchStrategy(source.fetchStrategyOptions);
        const parser = source.parser(source.parserOptions);

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
