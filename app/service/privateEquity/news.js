const Service = require('egg').Service;
const cheerio = require('cheerio');
const fs = require('fs');

class NewsService extends Service {
    /**
     * 服务-爬取新闻列表
     * @param {Number} page 新闻页数
     */
    async newsList(page = 1) {
      // 获取天天基金网址配置
      const { serverUrl } = this.config.privateEquity;
  
      // 发起请求加载HTML文档
      const { data: html } = await this.ctx.curl(`${serverUrl}`, {
        dataType: 'text',
        // 3 秒超时
        timeout: 5000,
      });

      // 清洗-使用cheerio模块
      const $ = cheerio.load(html);
      let data = new Array();
      $('.new-main ul li a').each((i, elem) => {
        data.push({ id: i, text: $(elem).text() });
      });

      // 存储-数据成json格式保存至本地指定目录
      const str_json = JSON.stringify(data);
      fs.writeFile('app/public/mock/news.txt', str_json, 'utf8', function(){
        console.log("保存完成");
      });
      return data;

        // parallel GET detail
        //   const newsList = await Promise.all(
        //     Object.keys(idList).map(key => {
        //       const url = `${serverUrl}/item/${idList[key]}.json`;
        //       return this.ctx.curl(url, { dataType: 'json' });
        //     })
        //   );
        //   return newsList.map(res => res.data);
    }
  }
  
  module.exports = NewsService;