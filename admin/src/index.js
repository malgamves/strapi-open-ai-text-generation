import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import PluginIcon from './components/PluginIcon';


const name = pluginPkg.strapi.name;

export default { 
  register(app) {
    
    app.customFields.register({
      name: "text-ai",
      pluginId: "ai-text-generation", // the custom field is created by a color-picker plugin
      type: "string", // the color will be stored as a string
      intlLabel: {
        id: "ai-text-generation.text-ai.label",
        defaultMessage: "Text AI",
      },
      intlDescription: {
        id: "ai-text-generation.text-ai.description",
        defaultMessage: "Let AI do your writing!",
      },
      icon: PluginIcon, // don't forget to create/import your icon component 
      components: {
        Input: async () => import(/* webpackChunkName: "input-component" */ "./components/Input"),
      },
      options: {
        base: [
          /*
            Declare settings to be added to the "Base settings" section
            of the field in the Content-Type Builder
          */
          {
            sectionTitle: { 
              id: 'ai-text-generation.text-ai.length',
              defaultMessage: 'Text Length',
            },
            items: [ // Add settings items to the section
              {
                
                intlLabel: {
                  id: 'ai-text-generation.text-ai.length.label',
                  defaultMessage: 'Select the length of your text',
                },
                name: 'options.length',
                type: 'select',
                value: '64', // these are tokens, 1 token is roughly 4 english words so this goes to approx 250 words
                options: [ 
                  {
                    key: '250 words',
                    value: '250',
                    metadatas: {
                      intlLabel: {
                        id: 'ai-text-generation.text-ai.length.250',
                        defaultMessage: '250 words',
                      },
                    },
                  },
                  {
                    key: '500 words',
                    value: '128', // these are tokens, 1 token is roughly 4 english words so this goes to approx 500 words
                    metadatas: {
                      intlLabel: {
                        id: 'ai-text-generation.text-ai.length.500',
                        defaultMessage: '500 words',
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    });
  },

  

  bootstrap(app) {},
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(
          /* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`
        )
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
