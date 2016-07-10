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

function httpFetchStrategy(options) {
  return {
    fetch() { 
      return makeRequest({
        uri: options.uri,
        method: options.method
      }).then(([request, body]) => {
        return body;
      }).catch(error => {
        throw error;
      });
    }
  };
}

httpFetchStrategy.pickOptions = pickOptions;

export default httpFetchStrategy;
