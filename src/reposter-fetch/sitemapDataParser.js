import { pick, streamify, makeRequest } from '../util';
import XMLStream from 'xml-stream';
import Promise from 'bluebird';
import document from './document';
import stripHTML from 'striptags';

const pickOptions = options => {
  const defaults = {
    sitemapLimit: 50000,
    minPriority: 0.8,
  };

  return { ...defaults, ...pick(options, ['sitemapLimit', 
                                          'minPriority']) };
};

function sitemapDataParser(options, eventBus, sourceID) {
  return {
    parse(data) { 
      const dataStream = streamify(data);
      const parser = new XMLStream(dataStream);
      const priorityThreshold = parseFloat(options.minPriority);

      eventBus.emit('sourceStateChange', sourceID, 
                    { type: 'sitemap_parse', total: 1 });

      return new Promise((resolve, reject) => {
        let pendingURIs = [];
        parser.on('text: url > loc', element => {
          const uri = element.$text;
          pendingURIs = [...pendingURIs, uri];
        });

        parser.on('text: url > priority', element => {
          const priority = parseFloat(element.$text);

          if (priority < priorityThreshold) {
            pendingURIs = pendingURIs.slice(0, -1);
          }
        });

        parser.on('error', err => { reject(err); });

        parser.on('end', () => {
          eventBus.emit('sourceStateProgress', sourceID);
          eventBus.emit('sourceStateChange', sourceID,
                        { type: 'title_fetch',
                          total: pendingURIs.length });


          Promise.reduce(pendingURIs, (partialResult, uri) => {
            return makeRequest({ uri, method: 'get' }).then(([request, body]) => {
              const title = stripHTML(body.match(/<title>(.*)\<\/title>/)[1]);
              eventBus.emit('sourceStateProgress', sourceID);

              return [...partialResult, document(uri, title)];
            }); 
          }, []).then(resolve);
        });
      }); 
    }
  };
}

sitemapDataParser.pickOptions = pickOptions;

export default sitemapDataParser;
