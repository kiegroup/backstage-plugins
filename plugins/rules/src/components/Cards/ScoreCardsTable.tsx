import React, { useCallback, useEffect, useState } from 'react';

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
import { Card } from '../../api/types';
import { EmptyAkrivisState } from '../EmptyAkrivisState';
import { CardForm } from './CardForm';
import { CardsTableToolbarItems } from './CardsTableToolbarItems';

export const ScoreCardsTable: React.FunctionComponent = () => {
  const scoreCardApi: ScoreCardApi = useApi(scoreCardApiRef);
  const [cards, setCards] = useState<DetailedCard[]>([]);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [selectedCardId, setSelectedCardId] = React.useState<
    number | undefined
  >(undefined);
  const handleModalToggle = () => {
    setModalOpen(!isModalOpen);
  };

  type DetailedCard = {
    id: number;
    name: string;
  };

  const reload = useCallback(() => {
    scoreCardApi.listScoreCards().then((value: { results: Card[] }) => {
      const result: DetailedCard[] = [];
      value.results.map(c => {
        result.push({
          id: c.id ?? -1,
          name: JSON.parse(c.definition).name,
        });
      });
      setCards(result);
    });
  }, [scoreCardApi]);

  useEffect(() => {
    reload();
  }, [reload]);

  const columnNames = {
    name: 'Name',
  };

  const defaultActions = (card: DetailedCard): IAction[] => [
    {
      title: 'Edit',
      onClick: () => {
        setSelectedCardId(card.id);
        handleModalToggle();
      },
    },
    {
      isSeparator: true,
    },
    {
      title: 'Delete',
      onClick: () => {
        scoreCardApi.deleteCard(card.id).then(() => reload());
      },
    },
  ];

  function mainElement() {
    if (cards.length === 0) {
      return (
        <EmptyAkrivisState
          onToggleModal={handleModalToggle}
          titleText="No Cards defined"
          body="Create a new Card"
          buttonText="Create a Card"
        />
      );
    }
    return (
      <div className="pf-v5-theme-dark">
        <CardsTableToolbarItems onToggleModal={handleModalToggle} />
        <Table aria-label="Actions table">
          <Thead>
            <Tr>
              <Th>{columnNames.name}</Th>
              <Th screenReaderText="Secondary action" />
            </Tr>
          </Thead>
          <Tbody>
            {cards.map(card => {
              const rowActions: IAction[] | null = defaultActions(card);

              return (
                <Tr key={card.id}>
                  <Td dataLabel={columnNames.name}>{card.name}</Td>
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
      <CardForm
        isModalOpen={isModalOpen}
        cardId={selectedCardId}
        onAfterCreate={reload}
      />
      {mainElement()}
    </React.Fragment>
  );
};
