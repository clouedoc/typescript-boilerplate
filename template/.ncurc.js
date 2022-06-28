module.exports = {
  upgrade: true,
  reject: ['puppeteer', '@types/puppeteer', '@types/node', 'got', 'execa'],
  loglevel: 'error',
  errorLevel: 1,
};
