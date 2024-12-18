import { MiddlewareFactory } from '@backstage/backend-defaults/rootHttpRouter';
import type { LoggerService } from '@backstage/backend-plugin-api';
import {Config} from "@backstage/config";

import express from 'express';
import Router from 'express-promise-router';

import { runScorecards } from './ScoreCardRunner';

export interface RouterOptions {
  logger: LoggerService;
  config: Config;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger } = options;
  const { config } = options;

  const router = Router();
  router.use(express.json());

  router.get('/health', (_, response) => {
    logger.info('PONG1!');
    response.json({ status: 'ok' });
  });

  router.get('/health2', (_, response) => {
    logger.info('PONG2!');
    response.json({ status: 'ok' });
  });

  router.get('/scorecards', async (_, response) => {
    const records = await runScorecards();

    logger.info('PONG3!');

    response.json({
      results: records,
    });
  });

  const middleware = MiddlewareFactory.create({ logger, config });

  router.use(middleware.error());
  return router;
}
