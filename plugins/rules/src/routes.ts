import { createRouteRef, createSubRouteRef } from '@backstage/core-plugin-api';

export const rootRouteRef = createRouteRef({
  id: 'rules',
});
export const cardsSubRouteRef = createSubRouteRef({
  id: 'cards',
  parent: rootRouteRef,
  path: '/cards',
});
