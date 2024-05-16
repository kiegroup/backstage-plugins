import { DiscoveryApi } from '@backstage/core-plugin-api';

import { ScoreCardApi } from './api';
import type { ScoreCard } from './types';

export class ScoreCardBackendClient implements ScoreCardApi {
  private readonly discoveryApi: DiscoveryApi;
  constructor(options: { discoveryApi: DiscoveryApi }) {
    this.discoveryApi = options.discoveryApi;
  }
  private async handleResponse(response: Response): Promise<any> {
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  }
  async getHealth(): Promise<{ status: string }> {
    const url = `${await this.discoveryApi.getBaseUrl('rules')}/health`;
    const response = await fetch(url, {
      method: 'GET',
    });
    return await this.handleResponse(response);
  }

  async listScoreCards(): Promise<{ results: ScoreCard[] }> {
    const url = `${await this.discoveryApi.getBaseUrl('rules')}/scorecards`;
    const response = await fetch(url, {
      method: 'GET',
    });

    return await this.handleResponse(response);
  }
}
