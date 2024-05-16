import React from 'react';

import { Progress, Table, TableColumn } from '@backstage/core-components';
import { useEntity } from '@backstage/plugin-catalog-react';

import { ScoreCard } from '../../api/types';
import { useScoreCards } from '../../useRulesClient';

export const exampleScorecards = {
  results: [
    {
      status: 'Ok',
      measureName: 'Code coverage',
      measureValue: '50',
    },
    {
      status: 'Warning',
      measureName: 'Security Issues',
      measureValue: '90',
    },
  ],
};

type DenseTableProps = {
  scorecards: ScoreCard[];
};

export const DenseTable = ({ scorecards }: DenseTableProps) => {
  const columns: TableColumn[] = [
    { title: 'Status', field: 'status' },
    { title: 'Measure', field: 'measureName' },
    { title: 'Value', field: 'measureValue' },
  ];

  const data = scorecards.map(scorecard => {
    return {
      status: scorecard.status,
      measureValue: scorecard.measureValue,
      measureName: scorecard.measureName,
    };
  });

  const { entity } = useEntity();

  const fullTitle = 'Scorecard for ' + entity.metadata.name;

  return (
    <Table
      title={fullTitle}
      options={{ search: false, paging: false }}
      columns={columns}
      data={data}
    />
  );
};

export const RulesFetchComponent = () => {
  const { value, loading, error } = useScoreCards();

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <div> error</div>;
  }

  return <DenseTable scorecards={value || []} />;
};
