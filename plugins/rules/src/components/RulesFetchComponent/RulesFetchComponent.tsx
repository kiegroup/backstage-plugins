import React from 'react';

import '@patternfly/react-core/dist/styles/base.css';
import '@patternfly/patternfly/patternfly-theme-dark.css';

import { Progress } from '@backstage/core-components';

import Grid from '@material-ui/core/Grid';

import { ScoreCard } from '../../api';
import { useScoreCards } from '../../useRulesClient';
import { ScorecardCard } from './ScorecardCard';

type Props = {
  scorecards: ScoreCard[];
};

export const ScoreCardVisualization = ({ scorecards }: Props) => {
  return (
    <div>
      <Grid container>
        {scorecards.map(scorecard => (
          <ScorecardCard scorecard={scorecard} />
        ))}
      </Grid>
    </div>
  );
};

export const RulesFetchComponent = () => {
  const { value, loading, error } = useScoreCards();

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <div> error</div>;
  }

  return <ScoreCardVisualization scorecards={value || []} />;
};
