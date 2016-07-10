function fileFetchStrategy(options) {
  return {
    fetch() {
      return options;
    }
  };
}

const pickOptions = ({ file }) => { 
  if (!file) {
    throw new Error(`pickOptions: file option is required.`);
  }

  return { file };
};

fileFetchStrategy.pickOptions = pickOptions;

export default fileFetchStrategy;
