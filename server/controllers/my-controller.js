'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('ai-text-generation')
      .service('myService')
      .getWelcomeMessage();
  },
});
