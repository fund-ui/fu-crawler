'use strict';

const path = require('path');
const Controller = require('egg').Controller;
class UploaderController extends Controller {
  /**
   * 控制器-返回文件上传页面
   */
  async index() {
    await this.ctx.render('uploader.tpl', { state: 'FuUploader' });
  }
  /**
   * 控制器-单文件上传存储至硬盘指定路径-同步
   */
  async upload() {
    const ctx = this.ctx;
    const stream = await ctx.getFileStream();
    const filename = encodeURIComponent(stream.fields.title) + path.extname(stream.filename).toLowerCase();
    const target = path.join(this.config.baseDir, 'app/public/file', filename); 
    try {
      const state = await ctx.service.fileManage.saveFile(stream, target); // 存储文件
      state === "success" ? ctx.redirect('/public/file/' + encodeURIComponent(filename)) : ctx.redirect('/uploader');
    } catch (err) {
      await ctx.service.fileManage.destroyFile(stream); // 销毁文件
      throw err;
    }
  }
  /**
   * 控制器-单文件上传存储至硬盘指定路径-异步
   */
  async uploadAjax() {
    const ctx = this.ctx;
    const stream = await ctx.getFileStream();
    const filename = encodeURIComponent(stream.fields.title) + path.extname(stream.filename).toLowerCase();
    const target = path.join(this.config.baseDir, 'app/public/file', filename); 
    try {
      const state = await ctx.service.fileManage.saveFile(stream, target); // 存储文件
      ctx.body = {
        code: 1,
        message: state,
        data: []
      };
    } catch (err) {
      await ctx.service.fileManage.destroyFile(stream); // 销毁文件
      throw err;
    }
  }
}

module.exports = UploaderController;