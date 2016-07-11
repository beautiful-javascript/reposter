const ProgressBar = require('progress');
import chalk from 'chalk';
import { cycled, shuffle } from '../util';

function progress(eventBus) {
  const sources = {};
  const COLORS = cycled(shuffle([
    chalk.red,
    chalk.green,
    chalk.yellow,
    chalk.blue,
    chalk.magenta,
    chalk.cyan,
    chalk.white,
    chalk.gray 
  ]));

  const barFormat = (sourceID, state) => { 
    return `⇨ ${chalk.bold(sourceID)} (:current/:total) ${chalk.underline(state)}`;
  };

  const callback = function afterFinish(bar) {
    bar.stream.moveCursor(0, -1);
  };

  return {
    listen() {
      eventBus.on('initializeSource', sourceID => {
				const color = COLORS.next();
        sources[sourceID] = {
					color,
					bar: new ProgressBar(color(barFormat(sourceID, 'init')),
                               { total: 1, callback })
				};
				sources[sourceID].bar.tick();
      });

      eventBus.on('sourceStateChange', (sourceID, newState) => {
        const { color, bar } = sources[sourceID];
        bar.terminate();
        sources[sourceID].bar = new ProgressBar(
                                  color(barFormat(sourceID, newState.type)),
                                  { total: newState.total, callback });
      });

			eventBus.on('sourceStateProgress', (sourceID) => {
        const { bar } = sources[sourceID];
        bar.tick();
			});
    }
  };
}

export default progress;
