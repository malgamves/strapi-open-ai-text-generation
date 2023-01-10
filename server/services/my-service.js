'use strict';

const axios = require('axios');


module.exports = ({ strapi }) => ({
  getWelcomeMessage() {
    return 'Welcome to Strapi 🚀';
  },

  async generate(prompt) {
    try {
      const response = await axios(
        {
          url: 'https://api.openai.com/v1/completions',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${strapi.plugin('ai-text-generation').config('accessToken')}` //functionality to be added
          },
          data: JSON.stringify({
            'model': 'text-davinci-001',
            'prompt': `${prompt}`,
            'temperature': 0.4,
            'max_tokens': 64,
            'top_p': 1,
            'frequency_penalty': 0,
            'presence_penalty': 0
          })
        })

      
      const result = await response.data;
      console.log('response:', response.data)
    return result;
  }
    catch (err){ 
      console.log(err.response)
    }

}
  
});
