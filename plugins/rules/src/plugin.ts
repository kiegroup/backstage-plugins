import {
  createApiFactory,
  createPlugin,
  createRoutableExtension,
  discoveryApiRef,
  identityApiRef,
} from '@backstage/core-plugin-api';

import { scoreCardApiRef } from './api/api';
import { ScoreCardBackendClient } from './api/RulesClient';
import { rootRouteRef } from './routes';

export const rulesPlugin = createPlugin({
  id: 'rules',
  apis: [
    createApiFactory({
      api: scoreCardApiRef,
      deps: {
        discoveryApi: discoveryApiRef,
        identityApi: identityApiRef,
      },
      factory: ({ discoveryApi, identityApi }) =>
        new ScoreCardBackendClient({ discoveryApi, identityApi }),
    }),
  ],
  routes: {
    root: rootRouteRef,
  },
});

export const RulesPage = rulesPlugin.provide(
  createRoutableExtension({
    name: 'RulesPage',
    component: () => import('./components').then(m => m.Router),
    mountPoint: rootRouteRef,
  }),
);
