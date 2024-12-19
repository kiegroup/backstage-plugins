import 'http';

import axios from 'axios';
import {CardResult} from "../../../../dist-types/plugins/rules/src/api";
import {Card, CardConfig, Job} from "../../../../dist-types/plugins/rules/src/api/types";

// TODO Figure how to report connection to service broken

export interface Record {
  status: String;
  measureValue: number;
  measureName: String;
  maxValue: number;
  yaml: string;
  thresholds: Threshold[];
}

export interface Threshold {
  name: string;
  value: number;
}

export interface RawData {
  id: number;
  createdAt: string;
  data: string;
}

export async function runScorecardsResults(ingestorUrl: string): Promise<CardResult[]> {
  console.log("calling scorecards");
  const url = `${ingestorUrl}/card/results`;

  const resp = await axios.get(url);

  console.log("response: ", resp.data);

  return resp.data;
}

export async function runScorecardsList(ingestorUrl: string): Promise<Card[]> {
  console.log("calling scorecards");
  const url = `${ingestorUrl}/card/list`;

  const resp = await axios.get(url);

  console.log("response: ", resp.data);

  return resp.data;
}

export async function runScorecardsHistory(ingestorUrl: string, cardId: number): Promise<Card[]> {
  console.log("calling scorecards");
  const url = `${ingestorUrl}/card/${cardId}/history`;

  const resp = await axios.get(url);

  console.log("card history: ", resp.data);

  return resp.data;
}

export async function runScorecardsData(ingestorUrl: string, cardId: number): Promise<Card[]> {
  console.log("calling scorecards");
  const url = `${ingestorUrl}/card/${cardId}/data`;

  const resp = await axios.get(url);

  console.log("card history: ", resp.data);

  return resp.data;
}

export async function runJobs(ingestorUrl: string): Promise<Job[]> {
  const url = `${ingestorUrl}/job`;

  const resp = await axios.get(url);
  return resp.data;
}

export async function findRawData(ingestorUrl: string, jobId: number): Promise<RawData[]> {
  const url = `${ingestorUrl}/job/${jobId}/data`;

  const resp = await axios.get(url);

  return resp.data;
}

export async function findRawDataDetail(
    ingestorUrl: string,
    jobId: number,
    rawDataId: number): Promise<RawData> {
  const url = `${ingestorUrl}/job/${jobId}/data/${rawDataId}`;

  const resp = await axios.get(url);

  return resp.data;
}

export async function testJob(ingestorUrl: string, jobId: number): Promise<object[]> {
  const url = `${ingestorUrl}/job/${jobId}/test`;

  const resp = await axios.post(url);

  return resp.data;
}

export async function activateJob(ingestorUrl: string, jobId: number): Promise<object[]> {
  const url = `${ingestorUrl}/job/${jobId}/activate`;

  const resp = await axios.post(url);

  return resp.data;
}

export async function deleteJob(ingestorUrl: string, jobId: number): Promise<object[]> {
  const url = `${ingestorUrl}/job/${jobId}`;

  const resp = await axios.delete(url);

  return resp.data;
}

export async function createJob(
    ingestorUrl: string,
    cron: string,
    type: string,
    endpoint: string): Promise<object[]> {
  const url = `${ingestorUrl}/job`;

  const data = {
    cron: cron,
    type: type,
    endpoint: endpoint,
  };

  const resp = await axios.post(url, data);

  return resp.data;
}

export async function createCard(
    ingestorUrl: string,
    card: Card,
    config: CardConfig): Promise<object[]> {
  const url = `${ingestorUrl}/card/add`;

  const data = {
    card: card,
    config: config,
  };

  const resp = await axios.post(url, data);

  return resp.data;
}
