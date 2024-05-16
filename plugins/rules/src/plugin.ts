import {
  createApiFactory,
  createPlugin,
  createRoutableExtension,
  discoveryApiRef,
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
      },
      factory: ({ discoveryApi }) =>
        new ScoreCardBackendClient({ discoveryApi }),
    }),
  ],
  routes: {
    root: rootRouteRef,
  },
});

export const RulesPage = rulesPlugin.provide(
  createRoutableExtension({
    name: 'RulesPage',
    component: () =>
      import('./components/RulesComponent').then(m => m.RulesComponent),
    mountPoint: rootRouteRef,
  }),
);
