import * as fs from 'fs';

function writer() {
  return {
    write(docs, outFile) {
      return fs.writeFileSync(outFile, 
                              JSON.stringify(docs));
    }
  };
}

export default writer;
