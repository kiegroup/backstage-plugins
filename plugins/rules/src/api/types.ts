export type ScoreCardResult = {
  cardId: number;
  runTime: number;
  status: string;
  measureValue: number;
  measureName: string;
  maxValue: number;
  yaml: string;
  thresholds: Threshold[];
};

export type Card = {
  id?: number;
  definition: string;
};

export type CardConfig = {
  definition: string;
};

export type CardData = {
  cardDefinition: string;
  configurationDefinition: string;
};

export type Threshold = {
  name: string;
  limit: number;
};

export type Job = {
  id: number;
  type: string;
  endpoint: string;
  status: string; // TODO make enum
  cron: string;
};

export type RawData = {
  id: number;
  createdAt: string;
};

export type RawDataDetail = {
  id: number;
  createdAt: string;
  data: string;
};
