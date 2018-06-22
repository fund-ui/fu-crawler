const Service = require('egg').Service;
const Crawler = require("crawler");
const fs      = require("fs");

class CrawlerImageService extends Service {
    /**
     * 服务-发起请求抓取图片至本地
     * @param {Object} {uri, filename} 图片地址，保存文件名称
     */
    async getPicture({uri, filename}) {
        return new Promise((resolve, reject) => {
            let c = new Crawler({
                encoding:null,
                jQuery:false,// set false to suppress warning message.
                callback:function(err, res, done){
                    if(err){
                        console.error(err.stack);
                        reject('crawler image failed');
                    }else{
                        fs.createWriteStream(res.options.filename).write(res.body);
                        resolve('crawler image finished');
                    }
                    done();
                }
            });
            c.queue({
                uri: uri,
                filename: filename
            });
        })
    }
    // 服务-存储文件路径至数据库
    async savePicture() {

    }
}

module.exports = CrawlerImageService;

