import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';

import { createRouter } from './service/router';

export const rulesBackendPlugin = createBackendPlugin({
  pluginId: 'rules',
  register(env) {
    env.registerInit({
      deps: {
        http: coreServices.httpRouter,
        logger: coreServices.logger,
        config: coreServices.rootConfig,
      },
      async init({http, logger, config}) {
        http.use(await createRouter({ logger, config }));
      },
    });
  },
});
