import {errorHandler} from '@backstage/backend-common';

import express from 'express';
import Router from 'express-promise-router';

import {
    createCard,
    createJob,
    deleteJob,
    findRawData,
    findRawDataDetail,
    runJobs,
    runScorecardsResults,
    testJob,
    activateJob,
    runScorecardsHistory,
    runScorecardsData, runScorecardsList,
} from './ScoreCardRunner';
import {LoggerService, RootConfigService} from "@backstage/backend-plugin-api";

export interface RouterOptions {
    logger: LoggerService;
    config: RootConfigService;
}

export async function createBackendRouter(
    options: RouterOptions,
): Promise<express.Router> {
    const {config, logger} = options;


    const ingestorUrl = config.getString('backend.scorecards.ingestor.url')
    console.log("+++++++ ingestorUrl: ", ingestorUrl)

    const router = Router();
    router.use(express.json());

    router.get('/health', (_, response) => {
        response.json({status: 'ok'});
    });

    router.get('/health2', (_, response) => {
        logger.info('PONG2!');
        response.json({status: 'ok'});
    });

    router.get('/job', async (_, response) => {
        const records = await runJobs(ingestorUrl);

        console.log('results: ', records);
        response.json({
            results: records,
        });
    });

    router.get('/job/:jobId/data', async (request, response) => {
        const jobId = parseInt(request.params.jobId, 10); // Convert jobId to number
        const records = await findRawData(ingestorUrl, jobId);

        console.log('results: ', records);
        response.json({
            results: records,
        });
    });

    router.get('/job/:jobId/data/:rawDataId', async (request, response) => {
        const jobId = parseInt(request.params.jobId, 10); // Convert jobId to number
        const rawDataId = parseInt(request.params.rawDataId, 10); // Convert jobId to number
        const records = await findRawDataDetail(ingestorUrl, jobId, rawDataId);

        console.log(`Testsed job: with results ${jobId} results: ${records}`);
        response.json({
            results: records,
        });
    });

    router.post('/job/:jobId/test', async (request, response) => {
        const jobId = parseInt(request.params.jobId, 10); // Convert jobId to number
        const records = await testJob(ingestorUrl, jobId);

        console.log('results: ', records);
        response.json({
            results: records,
        });
    });

    router.post('/job/:jobId/activate', async (request, response) => {
        const jobId = parseInt(request.params.jobId, 10); // Convert jobId to number
        const records = await activateJob(ingestorUrl, jobId);

        response.json({
            results: records,
        });
    });

    router.delete('/job/:jobId', async (request, response) => {
        const jobId = parseInt(request.params.jobId, 10); // Convert jobId to number
        const records = await deleteJob(ingestorUrl, jobId);

        console.log('deleted: ', jobId);
        response.json({
            results: records,
        });
    });

    router.post('/job', async (request, response) => {
        const body = request.body;
        console.log('body: ', JSON.stringify(body));

        const records = await createJob(ingestorUrl, body.cron, body.type, body.endpoint);

        console.log('results: ', JSON.stringify(records));
        response.json({
            results: records,
        });
    });

    router.post('/card/add', async (request, response) => {
        const body = request.body;
        console.log('creating card with body: ', JSON.stringify(body));

        const records = await createCard(ingestorUrl, body.card, body.config);

        console.log('results: ', JSON.stringify(records));

        response.json({
            results: records,
        });
    });

    router.get('/card/results', async (_, response) => {
        const records = await runScorecardsResults(ingestorUrl);

        console.log('card result');

        response.json({
            results: records,
        });
    });

    router.get('/card/list', async (_, response) => {
        const records = await runScorecardsList(ingestorUrl);

        console.log('card list');

        response.json({
            results: records,
        });
    });

    router.get('/card/:cardId/list', async (request, response) => {
        const cardId = parseInt(request.params.cardId, 10); // Convert jobId to number

        const records = await runScorecardsHistory(ingestorUrl, cardId);

        console.log('card list', records);

        response.json({
            results: records,
        });
    });

    router.get('/card/:cardId/data', async (request, response) => {
        const cardId = parseInt(request.params.cardId, 10); // Convert jobId to number

        const records = await runScorecardsData(ingestorUrl, cardId);

        console.log('card Data', records);

        response.json({
            results: records,
        });
    });

    router.get('/card/:cardId/history', async (request, response) => {
        const cardId = parseInt(request.params.cardId, 10); // Convert jobId to number

        const records = await runScorecardsHistory(ingestorUrl, cardId);

        console.log('card Data', records);

        response.json({
            results: records,
        });
    });

    router.use(errorHandler());
    return router;
}
