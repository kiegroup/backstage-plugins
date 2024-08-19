import React, { useEffect, useState } from 'react';

import { useApi } from '@backstage/core-plugin-api';

import {
  ActionsColumn,
  IAction,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@patternfly/react-table';

import { ScoreCardApi, scoreCardApiRef } from '../../api';
import { Job } from '../../api/types';
import { EmptyAkrivisState } from '../EmptyAkrivisState';
import { JobForm } from './JobForm';
import { JobsTableToolbarItems } from './JobsTableToolbarItems';

export const JobsTable: React.FunctionComponent = () => {
  const scoreCardApi: ScoreCardApi = useApi(scoreCardApiRef);

  const [jobs, setJobs] = useState<Job[]>([]);
  // In real usage, this data would come from some external source like an API via props.

  function reload() {
    scoreCardApi.getJobs().then((value: { results: Job[] }) => {
      setJobs(value.results);
    });
  }

  useEffect(() => {
    scoreCardApi.getJobs().then((value: { results: Job[] }) => {
      setJobs(value.results);
    });
  }, [scoreCardApi]);

  const columnNames = {
    name: 'Endpoint',
    cron: 'Cron',
    type: 'Type',
    status: 'Status',
  };

  const defaultActions = (job: Job): IAction[] => [
    {
      title: 'Test',
      onClick: () => {
        scoreCardApi
          .testJob(job.id)
          .then(response => response.json())
          .then(response => alert(JSON.stringify(response)));
      },
    },
    {
      title: 'Enable',
      onClick: () => {
        scoreCardApi.activate(job.id).then(resp => reload());
      },
    },
    {
      isSeparator: true,
    },
    {
      title: 'Delete',
      onClick: () => {
        scoreCardApi.deleteJob(job.id).then(resp => reload());
      },
    },
  ];

  const [isModalOpen, setModalOpen] = React.useState(false);
  const handleModalToggle = () => {
    setModalOpen(!isModalOpen);
  };

  function mainElement() {
    if (jobs.length === 0) {
      return (
        <EmptyAkrivisState
          onToggleModal={handleModalToggle}
          titleText="No Jobs defined"
          body="Create a new Job"
          buttonText="Create a Job"
        />
      );
    }
    return (
      <div className="pf-v5-theme-dark">
        <JobsTableToolbarItems onToggleModal={handleModalToggle} />
        <Table aria-label="Actions table">
          <Thead>
            <Tr>
              <Th>{columnNames.name}</Th>
              <Th>{columnNames.cron}</Th>
              <Th>{columnNames.type}</Th>
              <Th>{columnNames.status}</Th>
              <Th screenReaderText="Secondary action" />
            </Tr>
          </Thead>
          <Tbody>
            {jobs.length > 0 &&
              jobs.map(job => {
                const rowActions: IAction[] | null = defaultActions(job);

                return (
                  <Tr key={job.endpoint}>
                    <Td dataLabel={columnNames.name}>{job.endpoint}</Td>
                    <Td dataLabel={columnNames.cron}>{job.cron}</Td>
                    <Td dataLabel={columnNames.type}>{job.type}</Td>
                    <Td dataLabel={columnNames.status}>{job.status}</Td>
                    <Td isActionCell>
                      {rowActions ? <ActionsColumn items={rowActions} /> : null}
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </div>
    );
  }

  return (
    <React.Fragment>
      <JobForm isModalOpen={isModalOpen} onCreate={reload} />
      {mainElement()}
    </React.Fragment>
  );
};
