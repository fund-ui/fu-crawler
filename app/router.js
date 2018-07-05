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
  // 文件上传
  router.get('/uploader', controller.uploader.index);
  router.post('/upload', controller.uploader.upload); // 单文件同步上传
  router.post('/uploadAjax', controller.uploader.uploadAjax); // 单文件异步上传
  router.post('/uploadMulti', controller.uploader.uploadMulti); // 多文件异步上传
  // 文件管理
  router.get('/fileManage', controller.fileManage.index); // 文件管理示例页面
  //router.get('/api/v2/fileList', controller.fileManage.fileList); // 文件列表
  router.get('/api/v2/fileTree', controller.fileManage.fileTree); // 文件树形控件
};
