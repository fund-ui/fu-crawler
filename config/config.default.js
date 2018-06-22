'use strict';
const path = require('path');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1528361141535_1477';

  // add your config here
  config.middleware = [];

  // add view tpl
  config.view = {
    defaultExtension: '.nj',
    defaultViewEngine: 'nunjucks',
    root: [
      path.join(appInfo.baseDir, 'app/view'),
      path.join(appInfo.baseDir, 'path/to/another'),
    ].join(','),
  };
  return config;
};
