'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  /**
   * 渲染新闻页面
   */
  async index() {
    await this.ctx.render('market.tpl', { state: 'Hi i am news' });
  }
  /**
   * API-新闻列表
   */
  async newsList() {
    const newsData = await this.ctx.service.privateEquity.news.newsList(2);
    this.ctx.body = {
      code: 1,
      message: 'success',
      data: newsData
    };
  }
  /**
   * API-新闻详情
   */
  async newsInfo() {

  }
}

module.exports = NewsController;
