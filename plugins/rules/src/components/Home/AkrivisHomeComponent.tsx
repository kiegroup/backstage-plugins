import React from 'react';

import {
  Content,
  ContentHeader,
  Header,
  HeaderLabel,
  InfoCard,
  Page,
  SupportButton,
} from '@backstage/core-components';

import { Grid } from '@material-ui/core';

import { ScoreCardsTable } from '../Cards';
import { JobsTable } from '../Jobs';

export const AkrivisHomeComponent = () => {
  return (
    <Page themeId="tool">
      <Header title="Welcome to Scorecard" subtitle="Optional subtitle">
        <HeaderLabel label="Owner" value="Team X" />
        <HeaderLabel label="Lifecycle" value="Alpha" />
      </Header>
      <Content>
        <ContentHeader title="Plugin title">
          <SupportButton>A plugin for scorecards</SupportButton>
        </ContentHeader>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <InfoCard title="Jobs">
              <JobsTable />
            </InfoCard>
          </Grid>
          <Grid item>
            <InfoCard title="Cards">
              <ScoreCardsTable />
            </InfoCard>
          </Grid>
        </Grid>
      </Content>
    </Page>
  );
};
