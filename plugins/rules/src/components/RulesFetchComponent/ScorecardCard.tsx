import React from 'react';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
} from '@material-ui/core';
import {
  ChartDonutThreshold,
  ChartDonutUtilization,
  ChartThemeColor,
} from '@patternfly/react-charts';
import { CodeEditor } from '@patternfly/react-code-editor';
import { Modal, ModalVariant } from '@patternfly/react-core';

import { ScoreCard } from '../../api';

type Props = {
  scorecard: ScoreCard;
};
export const ScorecardCard = ({ scorecard }: Props) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleModalToggle = (_event: KeyboardEvent | React.MouseEvent) => {
    setIsModalOpen(!isModalOpen);
  };

  function formThresholdData(scoreCard: ScoreCard): any[] {
    return scoreCard.thresholds.map(threshold => {
      return {
        x: threshold.name,
        y: threshold.value,
      };
    });
  }

  function formThresholdDataLabels(scoreCard: ScoreCard): any[] {
    const map = scoreCard.thresholds.map(threshold => {
      return {
        name: `${threshold.name} threshold from ${threshold.value}`,
      };
    });
    return map;
  }

  function formThresholdValues(scoreCard: ScoreCard): any[] {
    return scoreCard.thresholds.map(threshold => {
      return {
        value: threshold.value - 1,
      };
    });
  }

  return (
    // TODO backstage prefers dark theme, what is the theme for that on this donut
    // <div className="pf-v5-theme-dark">
    <Grid item xs={6}>
      <Card>
        <CardContent>
          <b>{scorecard.measureName}</b>

          <div className="pf-v5-theme-dark">
            <Modal
              variant={ModalVariant.medium}
              title={scorecard.measureName}
              isOpen={isModalOpen}
              onClose={handleModalToggle}
              actions={[]}
            >
              <CodeEditor
                height="400px"
                isDarkTheme
                readOnly
                code={scorecard.yaml}
                contentEditable={false}
              />
            </Modal>
          </div>
          <div style={{ background: 'white' }}>
            <ChartDonutThreshold
              ariaDesc="Storage capacity"
              ariaTitle="Donut utilization chart with static threshold example"
              constrainToVisibleArea
              data={formThresholdData(scorecard)}
              height={200}
              labels={({ datum }) => (datum.x ? datum.x : null)}
              name="chart17"
              padding={{
                bottom: 30, // Adjusted to accommodate label
                left: 20,
                right: 260, // Adjusted to accommodate legend
                top: 20,
              }}
              width={425}
            >
              <ChartDonutUtilization
                data={{ x: 'Storage capacity', y: scorecard.measureValue }}
                labels={({ datum }) =>
                  datum.x ? `${datum.x}: ${datum.y}%` : null
                }
                legendData={formThresholdDataLabels(scorecard)}
                legendOrientation="vertical"
                invert
                subTitle={`of ${scorecard.maxValue}`}
                title={`${scorecard.measureValue}`}
                themeColor={ChartThemeColor.green}
                thresholds={formThresholdValues(scorecard)}
              />
            </ChartDonutThreshold>
          </div>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleModalToggle}>
            Source
          </Button>
          <Button size="small">History (TODO) </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
