import {DiscoveryApi, IdentityApi} from '@backstage/core-plugin-api';

import {ScoreCardApi} from './api';
import {
    Card,
    CardConfig,
    CardData,
    Job,
    RawData,
    RawDataDetail,
    ScoreCardResult,
} from './types';

export class ScoreCardBackendClient implements ScoreCardApi {

    private readonly discoveryApi: DiscoveryApi;
    private readonly identityApi: IdentityApi;

    constructor(options: { discoveryApi: DiscoveryApi, identityApi: IdentityApi }) {
        this.discoveryApi = options.discoveryApi;
        this.identityApi = options.identityApi;
    }

    private async handleResponse(response: Response): Promise<any> {
        if (!response.ok) {
            throw new Error();
        }
        const json = await response.json();
        const results = json.results;
        console.log('json', json);
        return results;
    }

    async getHealth(): Promise<{ status: string }> {
        const url = `${await this.discoveryApi.getBaseUrl('scorecards')}/health`;

        const response = await fetch(url, {
            method: 'GET',
        });
        return await this.handleResponse(response);
    }

    private async getAuthHeaders(): Promise<HeadersInit> {
        const {token} = await this.identityApi.getCredentials();
        return {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        };
    }

    private async fetchWithAuth(
        endpoint: string,
        options: RequestInit
    ): Promise<Response> {
        const url = `${await this.discoveryApi.getBaseUrl('scorecards')}${endpoint}`;
        console.log(`Calling url ${url} with body: ${options.body}`);
        const headers = await this.getAuthHeaders();

        return fetch(url, {...options, headers: {...headers, ...options.headers}});
    }

    async createCard(card: Card, config: CardConfig): Promise<Response> {
        return this.fetchWithAuth('/card/add', {
            method: 'POST',
            body: JSON.stringify({card: card, config: config}),
        });
    }

    async deleteCard(cardId: number): Promise<Response> {
        return this.fetchWithAuth(`/card/${cardId}`, {
            method: 'DELETE',
        });
    }

    async getCardData(cardId: number): Promise<CardData> {
        const response = await this.fetchWithAuth(`/card/${cardId}/data`, {
            method: 'GET',
        });

        return this.handleResponse(response);
    }

    async listCardResults(): Promise<{ results: ScoreCardResult[] }> {
        const response = await this.fetchWithAuth('/card/results', {
            method: 'GET',
        });

        return this.handleResponse(response);
    }

    async listCardResultHistory(
        cardId: number,
    ): Promise<{ results: ScoreCardResult[] }> {
        const response = await this.fetchWithAuth(`/card/${cardId}/history`, {
            method: 'GET',
        });

        return this.handleResponse(response);
    }


    async listScoreCards(): Promise<{ results: Card[] }> {
        const response = await this.fetchWithAuth('/card/list', {
            method: 'GET',
        });

        return this.handleResponse(response);
    }

    async getJobs(): Promise<{ results: Job[] }> {
        const response = await this.fetchWithAuth('/job', {
            method: 'GET',
        });

        return this.handleResponse(response);
    }

    async getRawData(jobId: number): Promise<{ results: RawData[] }> {
        const response = await this.fetchWithAuth(`/job/${jobId}/data`, {
            method: 'GET',
        });

        return this.handleResponse(response);
    }

    async getRawDataDetail(
        jobId: number,
        rawDataId: number,
    ): Promise<{ results: RawDataDetail }> {
        const response = await this.fetchWithAuth(`/job/${jobId}/data/${rawDataId}`, {
            method: 'GET',
        });

        return this.handleResponse(response);
    }

    async testJob(jobId: number): Promise<Response> {
        const response = await this.fetchWithAuth(`/job/${jobId}/test`, {
            method: 'POST',
        });

        return this.handleResponse(response);
    }

    async activate(jobId: number): Promise<Response> {
        const response = await this.fetchWithAuth(`/job/${jobId}/activate`, {
            method: 'POST',
        });

        return this.handleResponse(response);
    }

    async deleteJob(jobId: number): Promise<Response> {
        const response = await this.fetchWithAuth(`/job/${jobId}`, {
            method: 'DELETE',
        });

        return this.handleResponse(response);
    }

    async createJob(
        cron: string,
        type: string,
        endpoint: string,
    ): Promise<Response> {
        const response = await this.fetchWithAuth('/job', {
            method: 'POST',
            body: JSON.stringify({cron: cron, type: type, endpoint: endpoint}),
        });

        return this.handleResponse(response);
    }
}
