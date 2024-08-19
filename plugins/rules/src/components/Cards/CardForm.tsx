import React, { useCallback } from 'react';

import { useApi } from '@backstage/core-plugin-api';

import {
  Modal,
  ModalVariant,
  Wizard,
  WizardStep,
} from '@patternfly/react-core';

import { ScoreCardApi, scoreCardApiRef } from '../../api';
import { YamlEditor } from './YamlEditor';

type Props = {
  isModalOpen: boolean;
  cardId: number | undefined;
  onAfterCreate: any;
};

export const CardForm = ({
  isModalOpen = false,
  cardId = undefined,
  onAfterCreate = () => {},
}: Props) => {
  const scoreCardApi: ScoreCardApi = useApi(scoreCardApiRef);

  const [modalOpenState, setModalOpen] = React.useState(isModalOpen);
  const [cardValue, setCardValue] = React.useState('');
  const [configValue, setConfigValue] = React.useState('');

  const load = useCallback(() => {
    const id = cardId ?? -1;
    if (id >= 0) {
      scoreCardApi.getCardData(id).then(cardData => {
        setCardValue(cardData.cardDefinition);
        setConfigValue(cardData.configurationDefinition);
        setModalOpen(isModalOpen);
      });
    } else {
      setModalOpen(isModalOpen);
    }
  }, [scoreCardApi, isModalOpen, cardId]);

  React.useEffect(() => {
    load();
  }, [load]);

  const handleCardInputChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCardValue(value);
    }
  };

  const handleConfigInputChange = (value: string | undefined) => {
    if (value !== undefined) {
      setConfigValue(value);
    }
  };

  const handleModalToggle = () => {
    setModalOpen(!isModalOpen);
  };

  const createCard = () => {
    scoreCardApi
      .createCard({ definition: cardValue }, { definition: configValue })
      .then(() => {
        setModalOpen(false);
        onAfterCreate();
      });
  };

  return (
    <Modal
      className="pf-v5-theme-dark"
      variant={ModalVariant.large}
      title="Create a Card"
      description="Card something"
      isOpen={modalOpenState}
      onClose={handleModalToggle}
    >
      <Wizard
        height={400}
        title="Basic wizard"
        onSave={createCard}
        onClose={handleModalToggle}
      >
        <WizardStep name="Configuration" id="config-step">
          <YamlEditor value={configValue} onChange={handleConfigInputChange} />
        </WizardStep>
        <WizardStep
          name="Card"
          id="card-step"
          footer={{ nextButtonText: 'Finish' }}
        >
          <YamlEditor value={cardValue} onChange={handleCardInputChange} />
        </WizardStep>
      </Wizard>
    </Modal>
  );
};
