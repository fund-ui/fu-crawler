'use strict';

const Controller = require('egg').Controller;

class FileManageController extends Controller {
  /**
   * 渲染文件管理示例页面
   */
  async index() {
    await this.ctx.render('fileManage.tpl', { state: 'FuFileManage' });
  }
  /**
   * API-文件列表
   */
  async fileList() {
    const newsData = await this.ctx.service.privateEquity.news.fileList(2);
    this.ctx.body = {
      code: 1,
      message: 'success',
      data: newsData
    };
  }
  /**
   * API-删除文件
   */
  async newsInfo() {
    
  }
}

module.exports = FileManageController;
