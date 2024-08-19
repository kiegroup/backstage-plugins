import React from 'react';

import '@patternfly/react-core/dist/styles/base.css';
import '@patternfly/patternfly/patternfly-theme-dark.css';

import { EmptyState, Progress } from '@backstage/core-components';
import { useRouteRef } from '@backstage/core-plugin-api';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { ScoreCardResult } from '../../api';
import { rootRouteRef } from '../../routes';
import { useScoreCards } from '../../useRulesClient';
import { ScorecardCard } from './ScorecardCard';

const containerStyle = { width: '100%', height: '100vh' };

export const AddCardsButton = () => {
  const getCardsRootPath = useRouteRef(rootRouteRef);
  return (
    <Button
      color="primary"
      href={getCardsRootPath()}
      onClick={() => {}}
      variant="contained"
    >
      Create Cards
    </Button>
  );
};

export const EmptyCardState = () => {
  return (
    <div style={containerStyle}>
      <EmptyState
        missing="field"
        title="No cards found"
        description="Define scorecards."
        action={<AddCardsButton />}
      />
    </div>
  );
};
type Props = {
  scorecards: ScoreCardResult[];
};

export const ScoreCardVisualization = ({ scorecards }: Props) => {
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div style={{ float: 'right' }}>
            <AddCardsButton />
          </div>
        </Grid>
        {scorecards.map(scorecard => (
          <Grid item xs={4} key={scorecard.measureName}>
            <ScorecardCard scorecard={scorecard} />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export const ScoreCardsView = () => {
  const { value, loading, error } = useScoreCards();

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <div>error</div>;
  } else if (value.length === 0) {
    return <EmptyCardState />;
  }

  return <ScoreCardVisualization scorecards={value || []} />;
};
