import { makeRequest } from '../util';

const pickOptions = ({ uri, method }) => {
  if (!uri) {
    throw new Error(`pickOptions: uri option is required`);
  }

  if(!method) {
    throw new Error(`pickOptions: method option is required`);
  }

  return { uri, method };
};

function httpFetchStrategy(options, eventBus, sourceID) {
  eventBus.emit('sourceStateChange', sourceID, { type: 'http_fetch', 
                                                 total: 1 });

  return {
    fetch() { 
      return makeRequest({
        uri: options.uri,
        method: options.method
      }).then(([request, body]) => {
        eventBus.emit('sourceStateProgress', sourceID);
        return body;
      }).catch(error => {
        throw error;
      });
    }
  };
}

httpFetchStrategy.pickOptions = pickOptions;

export default httpFetchStrategy;
