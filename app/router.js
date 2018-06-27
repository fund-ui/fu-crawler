'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 首页
  router.get('/', controller.home.index);
  // 私募新闻
  router.get('/news', controller.news.index);
  router.get('/api/v2/newsList', controller.news.newsList);
  // 私募市场
  router.get('/market', controller.market.index);
  // 文件系统
  router.get('/uploader', controller.uploader.index);
  router.post('/upload', controller.uploader.upload); // 单文件同步上传
  router.post('/uploadAjax', controller.uploader.uploadAjax); // 单文件异步上传
};
