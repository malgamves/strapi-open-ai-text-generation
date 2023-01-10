'use strict';

module.exports = ({ strapi }) => ({
  async generate(ctx) {
    ctx.body = await strapi
      .plugin('ai-text-generation')
      .service('myService')
      .generate(ctx.request.body.prompt);
  },
});
