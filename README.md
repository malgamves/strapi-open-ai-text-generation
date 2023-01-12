# Strapi AI Text Generation Custom Feild with Open AI

With this Custom Field, you can leverage Open AI to generate CMS content for your products, webistes, blogs or whatever your heat desires.


<img src="https://user-images.githubusercontent.com/25641936/211792939-59ef9f11-b5b2-40d6-aa09-bfdeea5a17c2.gif" alt="A Custom Field called writer that generates text for content editors.">





### ✨ Coming Soon
- Change the number of words the API generates
- Change the langauge model used for text generation

## <a id="installation"></a>🔧 Installation

Inside your Strapi Application, add the package

With `npm`

```bash
npm install ai-text-generation
```

or `yarn`

```bash
yarn add ai-text-generation
```


Then get your Open AI API Token [here](https://beta.openai.com/account/api-keys) and add it to the `.env` file at the root of your project as `OPEN_AI_API_TOKEN`. Next, in `./config`, create a file called `plugins.js` to enable the plugin. 

```javascript
// ...
    'ai-text-generation': {
      enabled: true,
      config: {
        apiToken: process.env.OPEN_AI_API_TOKEN,
      },
    },
//...
```


After, build your admin with

```bash
npm run build
```

or

```bash
yarn build
```

and start your server with

```bash
npm run develop
```

or

```bash
yarn develop
```

and now you have the power of Open AI, right in your favourite CMS. 
For more on how to enable Custom Feilds in your content Model, have a look at this video on ["How to install and use Strapi custom fields"](https://www.youtube.com/watch?v=hIKfvLzN6VI).

## <a id="contributing"></a>🛠 Contributing

In this section, we'll look at how YOU can contribute to this Custom Field.

### Setting up the environment

Start by creating a new Strapi project.

```bash
npx create-strapi-app --quickstart strapi-plugin-dev
cd strapi-plugin-dev
```

Create a new plugins folder if it doesn't exist already.
```bash
mkdir -p src/plugins
```

Now we should clone this repository so you can work on it.

```bash
git clone https://github.com/malgamves/strapi-open-ai-text-generation.git src/plugins/ai-text-generation
```

Install project dependencies

```bash
yarn install
```

Now we need to register plugin so strapi can use it. In order to do that we need to create (if not already created) `./config/plugins.js` file and add entry to it.

```javascript
// ...
    'ai-text-generation': {
      enabled: true,
      config: {
        apiToken: process.env.OPEN_AI_API_TOKEN,
      },
      resolve: './src/plugins/ai-text-generation'
    },
// ...
```

> When contributing, you need to change the value of the `fetch()` url below https://github.com/malgamves/strapi-open-ai-text-generation/blob/78e692b214fc51f8de6bbf6a76fca4db767411eb/admin/src/components/Input/index.js#L25 to `http://localhost:1337`

Rebuild the project and start the server

```bash
yarn build
yarn develop
```

For an optimum development experience, start your Strapi server in `Watch Mode` so you don't have to build everytime you make changes as show below
```bash
yarn develop --watch-admin
```

Thanks to the team at [CKEditor](https://ckeditor.com/), the format of this Readme is [inspired by theirs](https://github.com/ckeditor/strapi-plugin-ckeditor).
