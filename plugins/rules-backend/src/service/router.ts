import { errorHandler } from '@backstage/backend-common';

import express from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';

import { YardServerConnection } from './YardServerConnection';

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

  router.get('/scorecards', (_, response) => {
    new YardServerConnection().run().then(response => {
      logger.info('Response from Yard Server: ' + JSON.stringify(response));
    });

    logger.info('PONG3!');

    response.json({
      results: [
        {
          status: 'Ok',
          measureValue: '50',
          measureName: 'Code coverage',
        },
        {
          status: 'Warning',
          measureValue: '90',
          measureName: 'Security Issues',
        },
      ],
    });
  });

  // router.get('/scorecards2', (_, response) => {
  //   logger.info('PONG!');

  //   const qubeclient = new DefaultSonarQubeClient()

  //   const measures = qubeclient.getMeasures();

  //   if (measures != undefined) {
  //     logger.info(measure);
  //   }

  //   response.json({
  //     results: [
  //       {
  //         status: 'Ok',
  //         measureValue: '50',
  //         measureName: 'Code coverage',
  //       },
  //       {
  //         status: 'Warning',
  //         measureValue: '90',
  //         measureName: 'Security Issues',
  //       },
  //     ],
  //   });
  // });

  router.use(errorHandler());
  return router;
}
