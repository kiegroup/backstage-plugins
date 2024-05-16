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

import { Grid, Typography } from '@material-ui/core';

import { RulesFetchComponent } from '../RulesFetchComponent';

export const RulesComponent = () => {
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
            <InfoCard title="Information card">
              <Typography variant="body1">
                All content should be wrapped in a card like this.
              </Typography>
            </InfoCard>
          </Grid>
          <Grid item>
            <RulesFetchComponent />
          </Grid>
        </Grid>
      </Content>
    </Page>
  );
};
