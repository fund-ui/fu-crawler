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
    
  }
  /**
   * API-新闻详情
   */
  async newsInfo() {

  }
}

module.exports = NewsController;
