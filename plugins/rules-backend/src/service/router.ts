import { errorHandler } from '@backstage/backend-common';

import express from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';

import { runScorecards } from './ScoreCardRunner';

export interface RouterOptions {
  logger: Logger;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger } = options;

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

  router.use(errorHandler());
  return router;
}
