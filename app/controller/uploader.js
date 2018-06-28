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
  /**
   * 控制器-多个文件上传
   */
  async uploadMulti() {
    const ctx = this.ctx;
    const parts = ctx.multipart();
    let part;
    while ((part = await parts()) != null) {
      if (part.length) {
        // 如果是数组的话是 filed
        console.log('field: ' + part[0]);
        console.log('value: ' + part[1]);
        console.log('valueTruncated: ' + part[2]);
        console.log('fieldnameTruncated: ' + part[3]);
      } else {
        // if (!part.fileName) {
        //   // 未选择文件就上传
        //   return;
        // }
        // part 是上传的文件流
        console.log('field: ' + part.fieldname);
        console.log('filename: ' + part.filename);
        console.log('encoding: ' + part.encoding);
        console.log('mime: ' + part.mime);
        // 文件处理，上传到云存储等等
        try {
          const target = path.join(this.config.baseDir, 'app/public/file', part.filename); 
          const state = await ctx.service.fileManage.saveFile(part, target); // 存储文件
          ctx.body = {
            code: 1,
            message: state,
            data: []
          };
        } catch (err) {
          // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
          await ctx.service.fileManage.destroyFile(part); // 销毁文件
          throw err;
        }
      }
    }
  }
}

module.exports = UploaderController;