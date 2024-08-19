import React from 'react';

import { Button, Card, CardActions, CardContent } from '@material-ui/core';
import {
  ChartDonutThreshold,
  ChartDonutUtilization,
  ChartThemeColor,
} from '@patternfly/react-charts';
import { CodeEditor } from '@patternfly/react-code-editor';
import { Modal, ModalVariant } from '@patternfly/react-core';

import { ScoreCardResult } from '../../api';
import { ScoreCardHistory } from './ScoreCardHistory';

type Props = {
  scorecard: ScoreCardResult;
};

const darkStyles = {
  '--pf-v5-chart-global--label--Fill': 'white',
  '--pf-v5-chart-donut--label--title--Fill': 'white',
} as React.CSSProperties;

export const ScorecardCard = ({ scorecard }: Props) => {
  const [isSourceModalOpen, setIsSourceModalOpen] = React.useState(false);
  const [isHistoryModalOpen, setHistoryModalOpen] = React.useState(false);

  const handleSourceModalToggle = (
    _event: KeyboardEvent | React.MouseEvent,
  ) => {
    setIsSourceModalOpen(!isSourceModalOpen);
  };

  const handleHistoryModalToggle = (
    _event: KeyboardEvent | React.MouseEvent,
  ) => {
    setHistoryModalOpen(!isHistoryModalOpen);
  };

  function formThresholdData(scoreCard: ScoreCardResult): any[] {
    return scoreCard.thresholds.map(threshold => {
      return {
        x: threshold.name,
        y: threshold.limit,
      };
    });
  }

  function formThresholdDataLabels(scoreCard: ScoreCardResult): any[] {
    const map = scoreCard.thresholds.map(threshold => {
      return {
        name: `${threshold.name} threshold from ${threshold.limit}`,
      };
    });
    return map;
  }

  function formThresholdValues(scoreCard: ScoreCardResult): any[] {
    return scoreCard.thresholds.map(threshold => {
      return {
        value: threshold.limit - 1,
      };
    });
  }

  return (
    <Card>
      <CardContent>
        <b>{scorecard.measureName}</b>

        <div className="pf-v5-theme-dark">
          <Modal
            className="pf-v5-theme-dark"
            variant={ModalVariant.medium}
            title={scorecard.measureName}
            isOpen={isHistoryModalOpen}
            onClose={handleHistoryModalToggle}
            actions={[]}
          >
            <ScoreCardHistory cardId={scorecard.cardId} />
          </Modal>
          <Modal
            className="pf-v5-theme-dark"
            variant={ModalVariant.medium}
            title={scorecard.measureName}
            isOpen={isSourceModalOpen}
            onClose={handleSourceModalToggle}
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
        <div style={darkStyles}>
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
        <Button size="small" onClick={handleSourceModalToggle}>
          Source
        </Button>
        <Button size="small" onClick={handleHistoryModalToggle}>
          History
        </Button>
      </CardActions>
    </Card>
  );
};
