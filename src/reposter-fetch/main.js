import 'babel-polyfill';

import config from './config'; 
import sources from './sources';
import fetcher from './fetcher';
import writer from './writer';

import chalk from 'chalk';

const { log } = console;

const reposter = config => {
  log(chalk.blue.bold('─────────────────────'));
  log(chalk.blue.bold('★ Reposter - Fetch ★'));
  log(chalk.blue.bold('─────────────────────'));
  log();
  log(chalk.white('❯ Processing sources...'));

  const parsedSources = sources().fromOptions(config.sources);

  fetcher().fetch(parsedSources).then(docs => {
    log(chalk.yellow(`✔ Gathered ${docs.length} articles.`));
    log(chalk.white(`❯ Writing output to ${config.out_file}...`));
    writer().write(docs, config.out_file);
  });
};

reposter(config());
