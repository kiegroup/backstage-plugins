import { useEffect, useState } from 'react';

import { useApi } from '@backstage/core-plugin-api';

import { scoreCardApiRef } from './api/api';
import { ScoreCardResult } from './api/types';

export const useScoreCards = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [value, setValue] = useState<ScoreCardResult[]>([]);
  const [error, setError] = useState<boolean>(false);
  const scoreCardApi = useApi(scoreCardApiRef);
  const getObjects = async () => {
    try {
      const scorecards = await scoreCardApi.listCardResults();
      setValue(scorecards.results);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getObjects();
  }, []);
  return {
    error,
    loading,
    value,
  };
};
