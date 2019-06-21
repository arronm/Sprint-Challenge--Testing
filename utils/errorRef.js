const errorRef = error => {
  const hash = Math.random().toString(36).substr(2);
  console.log(`${hash}: ${error}`);
  return {
    message: `Unknown Error, reference ${hash}`,
  };
};

module.exports = errorRef;
