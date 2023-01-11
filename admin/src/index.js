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
            sectionTitle: { // Add a "Format" settings section
              id: 'ai-text-generation.text-ai.api.details',
              defaultMessage: 'Text Details',
            },
            items: [ // Add settings items to the section
              {
                intlLabel: {
                  id: 'ai-text-generation.text-ai.key',
                  defaultMessage: 'Key',
                },
                name: 'options.key',
                type: 'input',
                value: '', // option selected by default
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
