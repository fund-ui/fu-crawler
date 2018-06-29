const Service = require('egg').Service;
const fs = require('fs');
const sendToWormhole = require('stream-wormhole');

class FileManageService extends Service {
  /**
   * 服务-文件保存
   * @param {Buffer} stream 文件二进制流
   * @param {String} target 文件保存路径
   */
  async saveFile(stream, target) {
    return new Promise((resolve, reject) => {
        const ws = fs.createWriteStream(target);
        stream.pipe(ws);
        ws.on('error', reject);
        ws.on('finish', () => { resolve('success'); });
    });
  }
  /**
   * 服务-销毁文件
   */
  async destroyFile() {
    await sendToWormhole(stream); // 销毁文件
  }
}

module.exports = FileManageService;