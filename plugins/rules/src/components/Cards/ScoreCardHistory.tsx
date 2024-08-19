import React, { useEffect, useState } from 'react';

import { useApi } from '@backstage/core-plugin-api';

import {
  Chart,
  ChartArea,
  ChartAxis,
  ChartGroup,
  ChartLegend,
  ChartThreshold,
  ChartVoronoiContainer,
} from '@patternfly/react-charts';
import { chart_color_orange_300 } from '@patternfly/react-tokens';

import { scoreCardApiRef } from '../../api';

type Props = {
  cardId: number;
};
const darkStyles = {
  '--pf-v5-chart-global--label--Fill': 'white',
} as React.CSSProperties;

interface ChartData {
  name: string;
  y: number;
  x: number;
}

export const ScoreCardHistory = ({ cardId }: Props) => {
  const [scoreCardResults, setScoreCardResults] = useState<ChartData[]>([]);
  const [thresholds, setThresholds] = useState<Map<string, ChartData[]>>(
    new Map(),
  );

  const scoreCardApi = useApi(scoreCardApiRef);

  useEffect(() => {
    scoreCardApi.listCardResultHistory(cardId).then(({ results }) => {
      const scResults: ChartData[] = [];
      const tholds = new Map<string, ChartData[]>();

      results.forEach(result => {
        result.thresholds?.forEach(t => {
          if (!tholds.has(t.name)) {
            tholds.set(t.name, []);
          }

          tholds
            .get(t.name)
            ?.push({ name: t.name, x: result.runTime, y: t.limit });
        });

        scResults.push({
          name: 'Score',
          x: result.runTime,
          y: result.measureValue,
        });
      });

      setScoreCardResults(scResults);
      setThresholds(tholds);
    });
  }, [scoreCardApi, cardId]);

  function chartLegendData() {
    const tholds: { name: string; symbol: {} }[] = [];

    for (const key of thresholds.keys()) {
      tholds.push({
        name: key,
        symbol: { fill: chart_color_orange_300.var, type: 'threshold' },
      });
    }

    return [{ name: 'Score' }, ...tholds];
  }

  return (
    <div style={darkStyles}>
      <Chart
        ariaDesc="Scores over time."
        ariaTitle="Scores"
        containerComponent={
          <ChartVoronoiContainer
            labels={({ datum }) => `${datum.name}: ${datum.y}`}
            constrainToVisibleArea
          />
        }
        legendComponent={<ChartLegend data={chartLegendData()} />}
        legendData={[
          { name: 'Score' },
          { name: 'Max score', symbol: { type: 'dash' } },
        ]}
        legendOrientation="vertical"
        legendPosition="right"
        height={250}
        maxDomain={{ y: 100 }}
        minDomain={{ y: 0 }}
        name="chart1"
        padding={{
          bottom: 50,
          left: 50,
          right: 200, // Adjusted to accommodate legend
          top: 50,
        }}
        width={600}
      >
        <ChartAxis dependentAxis showGrid tickValues={[20, 50, 80, 100]} />
        <ChartGroup>
          <ChartArea data={scoreCardResults} />
          {Array.from(thresholds.values()).map(g => (
            <ChartThreshold
              data={g}
              style={{
                data: {
                  stroke: chart_color_orange_300.var,
                  strokeDasharray: '3,3',
                },
              }}
            />
          ))}
        </ChartGroup>
      </Chart>
    </div>
  );
};
