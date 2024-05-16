import { errorHandler, loggerToWinstonLogger } from '@backstage/backend-common';
import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { PluginTaskScheduler } from '@backstage/backend-tasks';
import { Config } from '@backstage/config';
import { DiscoveryApi } from '@backstage/core-plugin-api';
import { catalogServiceRef } from '@backstage/plugin-catalog-node/alpha';
import { JsonObject, JsonValue } from '@backstage/types';

import { fullFormats } from 'ajv-formats/dist/formats';
import express from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';

import { createRouter } from './service/router';

export const rulesBackendPlugin = createBackendPlugin({
  pluginId: 'rules',
  register(env) {
    env.registerInit({
      deps: {
        logger: coreServices.logger,
        config: coreServices.rootConfig,
        discovery: coreServices.discovery,
        httpRouter: coreServices.httpRouter,
        urlReader: coreServices.urlReader,
        scheduler: coreServices.scheduler,
        catalogApi: catalogServiceRef,
      },
      async init({
        logger,
        config,
        discovery,
        httpRouter,
        catalogApi,
        urlReader,
        scheduler,
      }) {
        const log = loggerToWinstonLogger(logger);
        const router = await createRouter({
          logger: log,
        });
        httpRouter.use(router);
      },
    });
  },
});
