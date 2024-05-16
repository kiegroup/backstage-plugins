import React from 'react';

import { createDevApp } from '@backstage/dev-utils';

import { RulesPage, rulesPlugin } from '../src/plugin';

createDevApp()
  .registerPlugin(rulesPlugin)
  .addPage({
    element: <RulesPage />,
    title: 'Root Page',
    path: '/rules',
  })
  .render();
