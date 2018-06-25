'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const state = await this.ctx.service.crawlerImage.getPicture({
      uri: 'http://topicimg.1234567.com.cn/product/2017/6/2/e2370a20-b85c-4559-95e4-72a46387ae56.png',
      filename: 'nodejs-1920x1200.png',
    });
    await this.ctx.render('home.tpl', { state: state });
  }
}

module.exports = HomeController;
