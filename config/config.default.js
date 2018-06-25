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
    mapping: {
      '.tpl': 'nunjucks',
    },
    defaultViewEngine: 'nunjucks',
    root: [
      path.join(appInfo.baseDir, 'app/view'),
      path.join(appInfo.baseDir, 'path/to/another'),
    ].join(','),
  };

  // 新闻配置项
  config.news = {
    pageSize: 5,
    serverUrl: 'https://hacker-news.firebaseio.com/v0',
  };

  // 天天基金网-私募基金板块
  config.privateEquity = {
    serverUrl: 'http://simu.eastmoney.com'
  }
  
  return config;
};
