import 'babel-polyfill';

import config from './config'; 
import sources from './sources';
import fetcher from './fetcher';
import writer from './writer';
import progress from './progress';

import chalk from 'chalk';

const EventEmitter = require('events');

const { log } = console;

const reposter = config => {
  const eventBus = new EventEmitter();
	const progressBars = progress(eventBus);

  log(chalk.blue.bold('─────────────────────'));
  log(chalk.blue.bold('★ Reposter - Fetch ★'));
  log(chalk.blue.bold('─────────────────────'));
  log();
  log(chalk.white('❯ Processing sources...'));

	progressBars.listen();

  const parsedSources = sources(eventBus).fromOptions(config.sources);

  fetcher().fetch(parsedSources, eventBus).then(docs => {
    log(chalk.yellow(`✔ Gathered ${docs.length} articles.`));
    log(chalk.white(`❯ Writing output to ${config.out_file}...`));
    writer().write(docs, config.out_file);
  });
};

reposter(config());
