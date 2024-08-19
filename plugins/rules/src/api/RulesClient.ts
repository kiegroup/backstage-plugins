import { ConfigApi, DiscoveryApi } from '@backstage/core-plugin-api';

import { data } from 'msw';

import { Response } from '@janus-idp/backstage-plugin-kiali/src/services/Api';

import { ScoreCardApi } from './api';
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
  private readonly configApi: ConfigApi;

  static readonly DEFAULT_INGESTOR_PROXY_PATH = '/ingestor/api';

  private readonly discoveryApi: DiscoveryApi;
  constructor(options: { discoveryApi: DiscoveryApi; configApi: ConfigApi }) {
    this.discoveryApi = options.discoveryApi;
    this.configApi = options.configApi;
  }
  private async handleResponse(response: Response): Promise<any> {
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  }

  private async getBaseUrl(proxyPath: String) {
    return `${await this.discoveryApi.getBaseUrl('proxy')}${proxyPath}`;
  }

  private async getIngestorBaseUrl() {
    return await this.getBaseUrl(
      ScoreCardBackendClient.DEFAULT_INGESTOR_PROXY_PATH,
    );
  }

  async createCard(card: Card, config: CardConfig): Promise<Response> {
    const url = `${await this.getIngestorBaseUrl()}/card/add`;
    const createJobRequest = {
      card: card,
      configuration: config,
    };
    return await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createJobRequest),
    });
  }

  async deleteCard(cardId: number): Promise<Response> {
    const url = `${await this.getIngestorBaseUrl()}/card/${cardId}`;
    return await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  async getCardData(cardId: number): Promise<CardData> {
    const url = `${await this.getIngestorBaseUrl()}/card/${cardId}/data`;
    const response = await fetch(url, {
      method: 'GET',
    });

    return await this.handleResponse(response);
  }

  async listCardResults(): Promise<{ results: ScoreCardResult[] }> {
    const url = `${await this.getIngestorBaseUrl()}/card/results`;
    const response = await fetch(url, {
      method: 'GET',
    });

    return await this.handleResponse(response);
  }

  async listCardResultHistory(
    cardId: number,
  ): Promise<{ results: ScoreCardResult[] }> {
    const url = `${await this.getIngestorBaseUrl()}/card/${cardId}/history`;
    const response = await fetch(url, {
      method: 'GET',
    });

    return await this.handleResponse(response);
  }

  async listScoreCards(): Promise<{ results: Card[] }> {
    const url = `${await this.getIngestorBaseUrl()}/card/list`;
    const response = await fetch(url, {
      method: 'GET',
    });

    return await this.handleResponse(response);
  }

  async getJobs(): Promise<{ results: Job[] }> {
    const url = `${await this.getIngestorBaseUrl()}/job`;
    const response = await fetch(url, {
      method: 'GET',
    });

    return await this.handleResponse(response);
  }

  async getRawData(jobId: number): Promise<{ results: RawData[] }> {
    const url = `${await this.getIngestorBaseUrl()}/job/${jobId}/data`;
    const response = await fetch(url, {
      method: 'GET',
    });

    return await this.handleResponse(response);
  }

  async getRawDataDetail(
    jobId: number,
    rawDataId: number,
  ): Promise<{ results: RawDataDetail }> {
    const url = `${await this.getIngestorBaseUrl()}/job/${jobId}/data/${rawDataId}`;
    const response = await fetch(url, {
      method: 'GET',
    });

    return await this.handleResponse(response);
  }

  async testJob(jobId: number): Promise<Response> {
    const url = `${await this.getIngestorBaseUrl()}/job/${jobId}/test`;
    const response: Response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response;
  }

  async activate(jobId: number): Promise<Response> {
    const url = `${await this.getIngestorBaseUrl()}/job/${jobId}/activate`;
    const response: Response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response;
  }

  async deleteJob(jobId: number): Promise<Response> {
    const url = `${await this.getIngestorBaseUrl()}/job/${jobId}`;
    return await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  async createJob(
    cron: string,
    type: string,
    endpoint: string,
  ): Promise<Response> {
    const url = `${await this.getIngestorBaseUrl()}/job`;
    const createJobRequest = {
      cron: cron,
      type: type,
      endpoint: endpoint,
    };
    return await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createJobRequest),
    });
  }
}
