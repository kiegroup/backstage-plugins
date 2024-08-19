import React from 'react';

import { useApi } from '@backstage/core-plugin-api';

import {
  Button,
  Form,
  FormGroup,
  Modal,
  ModalVariant,
  Popover,
  Radio,
  TextInput,
} from '@patternfly/react-core';
import HelpIcon from '@patternfly/react-icons/dist/esm/icons/help-icon';
import formStyles from '@patternfly/react-styles/css/components/Form/form';

import { ScoreCardApi, scoreCardApiRef } from '../../api';

type Props = {
  isModalOpen: any;
  onCreate: any;
};

export const JobForm = ({
  isModalOpen = false,
  onCreate = () => {},
}: Props) => {
  const scoreCardApi: ScoreCardApi = useApi(scoreCardApiRef);
  const [modalOpenState, setModalOpen] = React.useState(isModalOpen);
  const [endPointValue, setEndPointValue] = React.useState('');
  const [cronValue, setCronValue] = React.useState('');
  const [typeValue, setTypeValue] = React.useState('');

  React.useEffect(() => {
    setModalOpen(isModalOpen);
  }, [isModalOpen]);

  const handleModalToggle = (_event: KeyboardEvent | React.MouseEvent) => {
    setModalOpen(!isModalOpen);
  };

  const createJob = (_event: KeyboardEvent | React.MouseEvent) => {
    scoreCardApi.createJob(cronValue, typeValue, endPointValue).then(() => {
      onCreate();
      handleModalToggle(_event);
    });
  };

  const handleEndPointInputChange = (_event: any, value: string) => {
    setEndPointValue(value);
  };

  const handleCronInputChange = (_event: any, value: string) => {
    setCronValue(value);
  };

  function handleTypeInputChange(value: string) {
    setTypeValue(value);
  }

  return (
    <React.Fragment>
      <Modal
        className="pf-v5-theme-dark"
        variant={ModalVariant.small}
        title="Create Job"
        description="A Job will query the given Endpoint by the given Cron timing."
        isOpen={modalOpenState}
        onClose={handleModalToggle}
        actions={[
          <Button
            key="create"
            variant="primary"
            form="modal-with-form-form"
            onClick={createJob}
          >
            Confirm
          </Button>,
          <Button key="cancel" variant="link" onClick={handleModalToggle}>
            Cancel
          </Button>,
        ]}
      >
        <Form id="modal-with-form-form">
          <FormGroup
            label="Endpoint"
            labelIcon={
              <Popover
                className="pf-v5-theme-dark"
                headerContent={<div>Job endpoint.</div>}
                bodyContent={
                  <div>Where to fetch the raw data for the cards.</div>
                }
              >
                <button
                  type="button"
                  onClick={e => e.preventDefault()}
                  aria-describedby="modal-with-form-form-name"
                  className={formStyles.formGroupLabelHelp}
                >
                  <HelpIcon />
                </button>
              </Popover>
            }
            isRequired
            fieldId="modal-with-form-form-name"
          >
            <TextInput
              isRequired
              id="modal-with-form-form-name"
              name="modal-with-form-form-name"
              value={endPointValue}
              onChange={handleEndPointInputChange}
            />
          </FormGroup>
          <FormGroup
            label="Cron"
            labelIcon={
              <Popover
                className="pf-v5-theme-dark"
                headerContent={<div>Scheduler for the Job</div>}
                bodyContent={<div>How often will the Job be executed.</div>}
              >
                <button
                  type="button"
                  onClick={e => e.preventDefault()}
                  aria-describedby="modal-with-form-form-email"
                  className={formStyles.formGroupLabelHelp}
                >
                  <HelpIcon />
                </button>
              </Popover>
            }
            isRequired
            fieldId="modal-with-form-form-email"
          >
            <TextInput
              isRequired
              id="modal-with-form-form-email"
              name="modal-with-form-form-email"
              value={cronValue}
              onChange={handleCronInputChange}
            />
          </FormGroup>
          <FormGroup
            role="radiogroup"
            isInline
            fieldId="basic-form-radio-group"
            label="Endpoint Type"
            isRequired
            labelIcon={
              <Popover
                className="pf-v5-theme-dark"
                headerContent={<div>Type of connection.</div>}
                bodyContent={
                  <div>
                    Some connections have enhanced raw data and connection
                    management.
                  </div>
                }
              >
                <button
                  type="button"
                  onClick={e => e.preventDefault()}
                  aria-describedby="modal-with-form-form-email"
                  className={formStyles.formGroupLabelHelp}
                >
                  <HelpIcon />
                </button>
              </Popover>
            }
          >
            <Radio
              name="basic-inline-radio"
              label="Default"
              id="basic-inline-radio-01"
              onClick={() => handleTypeInputChange('Default')}
            />
            <Radio
              name="basic-inline-radio"
              label="GitHub"
              id="basic-inline-radio-02"
              onClick={() => handleTypeInputChange('GitHub')}
            />
            <Radio
              name="basic-inline-radio"
              label="GitHubMock"
              id="basic-inline-radio-03"
              onClick={() => handleTypeInputChange('GitHubMock')}
            />
          </FormGroup>
        </Form>
      </Modal>
    </React.Fragment>
  );
};
