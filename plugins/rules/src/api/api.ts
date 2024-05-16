import { createApiRef } from '@backstage/core-plugin-api';

import { ScoreCard } from './types';

export interface ScoreCardApi {
  getHealth(): Promise<{ status: string }>;

  listScoreCards(): Promise<{ results: ScoreCard[] }>;
}

export const scoreCardApiRef = createApiRef<ScoreCardApi>({
  id: 'plugin.rules.api',
});
