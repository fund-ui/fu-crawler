const path = require('path');
const sendToWormhole = require('stream-wormhole');
const Controller = require('egg').Controller;
const fs = require('fs');

class UploaderController extends Controller {
  /**
   * 控制器-单文件上传存储至硬盘指定路径
   */
  async upload() {
    const ctx = this.ctx;
    const stream = await ctx.getFileStream();
    const filename = encodeURIComponent(stream.fields.title) + path.extname(stream.filename).toLowerCase();
    const target = path.join(this.config.baseDir, 'app/public/file', filename);
    // 保存文件流至本地指定路径
    const saveFile = (stream, target) => {
      return new Promise((resolve, reject) => {
        const ws = fs.createWriteStream(target);
        stream.pipe(ws);
        ws.on('error', reject);
        ws.on('finish', resolve('success'));
      })
    }
    try {
      await saveFile(stream, target);
    } catch (err) {
      await sendToWormhole(stream);
      throw err;
    }
    this.ctx.redirect('/public/file/' + encodeURIComponent(filename));
  }
}

module.exports = UploaderController;