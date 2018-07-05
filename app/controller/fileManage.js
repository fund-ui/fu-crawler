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
   * API-文件树形结构
   */
  async fileTree() {
    const data = {
        title: "基金",
        tooltip: "基金",
        key: "/基金",
        folder: true,
        expanded: true,
        children: [
            { title: "融汇1号", tooltip: "融汇1号", key: "/基金/融汇1号", folder: true, children: null, lazy: true },
            { title: "精诚信诺", tooltip: "融汇1号", key: "/基金/融汇1号", folder: true, children: null }
        ]
    }
    this.ctx.body = {
      code: 1,
      message: 'success',
      data: data
    };
  }
  /**
   * API-删除文件
   */
  async newsInfo() {
    
  }
}

module.exports = FileManageController;
