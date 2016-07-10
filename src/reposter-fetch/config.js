import * as yargs from 'yargs';

const config = () => {
  const config = yargs.alias('s', 'sources').
                       alias('o', 'out_file').
                       describe('o', 'file name for the output').
                       describe('s', 
                                'specify sources for ' +
                                'your reposting campaign. ').
                       demand(['sources', 'out_file']).
                       usage('Usage: $0 --sources [source1] [source2]...' +
                             ' --out_file [filename]').
                       array('sources').argv;
  
  return config;
}

export default config;
