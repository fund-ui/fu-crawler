'use strict';

const Controller = require('egg').Controller;

class MarketController extends Controller {
  /**
   * 渲染市场页面
   */
  async index() {
    await this.ctx.render('market.tpl', { state: 'Hi i am market' });
  }

}

module.exports = MarketController;
