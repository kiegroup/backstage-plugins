import type {
  AuthService,
  DiscoveryService,
  HttpAuthService,
  LoggerService,
  PermissionsService,
  SchedulerService,
  UrlReaderService,
} from '@backstage/backend-plugin-api';
import type { CatalogApi } from '@backstage/catalog-client';
import type { Config } from '@backstage/config';

import express from 'express';

import { createBackendRouter } from '../service/router';

export interface RouterOptions {
  config: Config;
  logger: LoggerService;
  discovery: DiscoveryService;
  catalogApi: CatalogApi;
  urlReader: UrlReaderService;
  scheduler: SchedulerService;
  permissions: PermissionsService;
  httpAuth: HttpAuthService;
  auth: AuthService;
}

export async function createRouter(
  args: RouterOptions,
): Promise<express.Router> {

  return await createBackendRouter({
    logger: args.logger,
    config: args.config,
  });
}
