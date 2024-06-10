import React from 'react';

import '@patternfly/react-core/dist/styles/base.css';
import '@patternfly/patternfly/patternfly-theme-dark.css';

import { Progress } from '@backstage/core-components';

import {
  ChartDonutThreshold,
  ChartDonutUtilization,
  ChartThemeColor,
} from '@patternfly/react-charts';
import { CodeEditor } from '@patternfly/react-code-editor';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalVariant,
} from '@patternfly/react-core';
import { CodeIcon } from '@patternfly/react-icons';

import { ScoreCard } from '../../api';
import { useScoreCards } from '../../useRulesClient';

type Props = {
  scorecards: ScoreCard[];
};

export const ScoreCardVisualization = ({ scorecards }: Props) => {
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

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleModalToggle = (_event: KeyboardEvent | React.MouseEvent) => {
    setIsModalOpen(!isModalOpen);
  };
  // TODO backstage prefers dark theme, what is the theme for that on this donut
  return (
    // <div className="pf-v5-theme-dark">
    <div>
      {scorecards.map(scorecard => {
        return (
          <div>
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
            <Card ouiaId="BasicCard" style={{ background: 'white' }}>
              <CardTitle
                style={{ color: 'black', paddingLeft: 20, paddingTop: 20 }}
              >
                <b>{scorecard.measureName}</b>
                <Button
                  style={{ float: 'right', marginRight: 10 }}
                  onClick={handleModalToggle}
                  variant="plain"
                  aria-label="Action"
                >
                  <CodeIcon />
                </Button>
              </CardTitle>
              <CardBody>
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
              </CardBody>
            </Card>
          </div>
        );
      })}
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
