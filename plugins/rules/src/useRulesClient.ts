import { useEffect, useState } from 'react';

import { useApi } from '@backstage/core-plugin-api';

import { scoreCardApiRef } from './api/api';
import { ScoreCard } from './api/types';

export const useScoreCardObjects = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const scoreCardApi = useApi(scoreCardApiRef);
  const getObjects = async () => {
    try {
      const health = await scoreCardApi.getHealth();
      setStatus(health.status);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getObjects();
  });
  return {
    error,
    loading,
    status,
  };
};

export const useScoreCards = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [value, setValue] = useState<ScoreCard[]>([]);
  const [error, setError] = useState<boolean>(false);
  const scoreCardApi = useApi(scoreCardApiRef);
  const getObjects = async () => {
    try {
      const scorecards = await scoreCardApi.listScoreCards();
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
