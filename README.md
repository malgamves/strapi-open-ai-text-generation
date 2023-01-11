# Strapi AI Text Generation Custon Feild with Open AI

<img src="https://user-images.githubusercontent.com/25641936/211792939-59ef9f11-b5b2-40d6-aa09-bfdeea5a17c2.gif" alt="A Custom Field called writer that generates text for content editors.">



## <a id="features"></a>✨ Features


Coming Soon:
- 

## <a id="installation"></a>🔧 Installation

Inside your Strapi app, add the package:

With `npm`:

```bash
npm install [add npm name when up]
```

for `yarn` run

```bash
yarn add [add npm name when up]
```

Then run build with

```bash
npm run build
```

or

```bash
yarn build
```


You will also need to add your `OPEN_AI_API_TOKEN` environment variable in the `config/plugins.js` file. 

```javascript
// ...
    'ai-text-generation': {
      enabled: true,
      config: {
        apiToken: process.env.OPEN_AI_API_TOKEN,
      },
    },
```


Notes

## <a id="contributing"></a>🛠 Contributing

In this section, we'll look at how YOU can contribute to this Custom Field.

### Setting up the environment

Start by creating a new Strapi project.

```
npx create-strapi-app --quickstart strapi
cd strapi
```

Create a new plugins folder if it doesn't exist already.
```
mkdir -p src/plugins
```

Now we should clone this repository so you can work on it.

```
git clone git@github.com:malgamves/strapi-open-ai-text-generation.git src/plugins/ai-text-generation
```

Install dependencies:

```
yarn install
```

Now we need to register plugin so strapi can use it. In order to do that we need
to create (if not already created) `./config/plugins.js` file and add entry to it.

```javascript
// ...
    'ai-text-generation': {
      enabled: true,
      config: {
        apiToken: process.env.OPEN_AI_API_TOKEN,
      },
      resolve: './src/plugins/ai-text-generation'
    },
```

> When contributing, you need to change the value of the (fetch url)(https://github.com/malgamves/strapi-open-ai-text-generation/blob/78e692b214fc51f8de6bbf6a76fca4db767411eb/admin/src/components/Input/index.js#L25) to `http://localhost:1337`

Rebuild the project and start the server:

```bash
yarn build
yarn develop
```

For an optimum development experience, start your Strapi server in Watch Mode so you don't have to build everytime you make changes as show below
```bash
yarn develop --watch-admin
```

Thanks to the team at [CKEditor](https://ckeditor.com/), the format of this Readme is [inspired by theirs](https://github.com/ckeditor/strapi-plugin-ckeditor).
