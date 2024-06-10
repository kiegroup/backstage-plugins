export type ScoreCard = {
  status: string;
  measureValue: number;
  measureName: string;
  maxValue: number;
  yaml: string;
  thresholds: Threshold[];
};
export type Threshold = {
  name: string;
  value: number;
};
