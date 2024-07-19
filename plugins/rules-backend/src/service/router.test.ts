import { mockServices } from '@backstage/backend-test-utils';
import { ConfigReader } from '@backstage/config';

import express from 'express';
import request from 'supertest';

import { createRouter } from './router';

const logger = mockServices.logger.mock();

describe('createRouter', () => {
  let app: express.Express;

  beforeAll(async () => {
    const router = await createRouter({
      logger,
      config: new ConfigReader({})
    });
    app = express().use(router);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('GET /health', () => {
    it('returns ok', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toEqual(200);
      expect(response.body).toEqual({ status: 'ok' });
    });
  });

  describe('GET /job', () => {
    it('returns ok', async () => {
      const response = await request(app).get('/job');

      expect(response.status).toEqual(200);
      // expect(response.body).toEqual({ status: 'ok' });
    });
  });

  describe('GET /job/2/data', () => {
    it('returns ok', async () => {
      const response = await request(app).get('/job/2/data');

      expect(response.status).toEqual(200);
      // expect(response.body).toEqual({ status: 'ok' });
    });
  });
});
