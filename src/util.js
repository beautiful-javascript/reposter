import * as stream from 'stream';
import request from 'request';
import Promise from 'bluebird';

export function pick(obj, keys) { 
  return Object.keys(obj).reduce((result, key) => {
    if (keys.includes(key)) {
      return { [key]: obj[key], ...result };
    }

    return result;
  }, {});
};

const makeRequestWithCallback = (options, cb) => {
  return request(options, (err, response, body) => {
    if (err) {
      return cb(err, null);
    }
 
    if (response.statusCode > 299) {
      return cb(new Error(
           `error status code: ${response.statusCode} ` + 
           `(opts: ${JSON.stringify(options)})`),
         null);
    }

    return cb(null, response, body);
  });
};

export const makeRequest = Promise.promisify(
                            makeRequestWithCallback,
                            { multiArgs: true });

export function streamify(text) {
  const readable = new stream.Readable();
  readable.push(text);
  readable.push(null);
  return readable; 
};

export function range(s, e) {
  let res = [];
  for(let i = s; i < e; ++i) {
    res.push(i);
  }
  return res;
};

export function cycled(data) {
  let currentIndex = 0;
  const elements = data;

  return {
    next() { 
      const result = elements[currentIndex]; 
      currentIndex += 1;
      currentIndex %= elements.length;
      return result; 
    }
  };
};

export function shuffle(array) {
	let counter = array.length;

	while (counter > 0) {
			let index = Math.floor(Math.random() * counter);

			counter--;

			let temp = array[counter];
			array[counter] = array[index];
			array[index] = temp;
	}

	return array;
}
