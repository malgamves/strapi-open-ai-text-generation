'use strict';

module.exports = ({ strapi }) => ({
  async generate(ctx) {
    ctx.body = await strapi
      .plugin('ai-text-generation')
      .service('openAi')
      .generateText(ctx.request.body.prompt, ctx.request.body.max_tokens);
  },
});
