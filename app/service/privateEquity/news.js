const Service = require('egg').Service;

class NewsService extends Service {
    async list(page = 1) {
      // 获取天天基金网址配置
      const { serverUrl } = this.config.privateEquity;
  
      // 发起请求加载文档
      const { data: idList } = await this.ctx.curl(`${serverUrl}`, {
        data: {
        },
        dataType: 'json',
        // 3 秒超时
        timeout: 5000,
      });
  
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