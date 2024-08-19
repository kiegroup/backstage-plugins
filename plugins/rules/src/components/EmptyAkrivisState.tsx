import React from 'react';

import {
  Button,
  EmptyState,
  EmptyStateActions,
  EmptyStateBody,
  EmptyStateFooter,
  EmptyStateHeader,
  EmptyStateIcon,
  EmptyStateVariant,
} from '@patternfly/react-core';
import { CubesIcon } from '@patternfly/react-icons';

type Props = {
  onToggleModal: any;
  titleText: string;
  body: string;
  buttonText: string;
};

export const EmptyAkrivisState = (props: Props) => {
  return (
    <EmptyState variant={EmptyStateVariant.xl}>
      <EmptyStateHeader
        titleText={props.titleText}
        headingLevel="h4"
        icon={<EmptyStateIcon icon={CubesIcon} />}
      />
      <EmptyStateBody>{props.body}</EmptyStateBody>
      <EmptyStateFooter>
        <EmptyStateActions>
          <Button variant="primary" onClick={props.onToggleModal}>
            {props.buttonText}
          </Button>
        </EmptyStateActions>
      </EmptyStateFooter>
    </EmptyState>
  );
};
