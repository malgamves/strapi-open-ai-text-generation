import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';
import AITextIcon from './components/PluginIcon';


const name = pluginPkg.strapi.name;

export default { 
  register(app) {
    // app.addMenuLink({
    //   to: `/plugins/${pluginId}`,
    //   icon: PluginIcon,
    //   intlLabel: {
    //     id: `${pluginId}.plugin.name`,
    //     defaultMessage: name,
    //   },
    //   Component: async () => {
    //     const component = await import(/* webpackChunkName: "[request]" */ './pages/App');

    //     return component;
    //   },
    //   permissions: [
    //     // Uncomment to set the permissions of the plugin here
    //     // {
    //     //   action: '', // the action name should be plugin::plugin-name.actionType
    //     //   subject: null,
    //     // },
    //   ],
    // });
    // app.registerPlugin({
    //   id: pluginId,
    //   initializer: Initializer,
    //   isReady: false,
    //   name,
    // });
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
      icon: AITextIcon, // don't forget to create/import your icon component 
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
              defaultMessage: 'API Details',
            },
            items: [ // Add settings items to the section
              {
                /*
                  Add a "Color format" dropdown
                  to choose between 2 different format options
                  for the color value: hexadecimal or RGBA
                */
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
