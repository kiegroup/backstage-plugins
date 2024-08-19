import React from 'react';

import {
  Button,
  SearchInput,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from '@patternfly/react-core';

type Props = {
  onToggleModal: any;
};

export const JobsTableToolbarItems = ({ onToggleModal }: Props) => {
  const items = (
    <React.Fragment>
      <ToolbarItem variant="search-filter">
        <SearchInput aria-label="Items example search input" />
      </ToolbarItem>
      <ToolbarItem variant="separator" />
      <ToolbarItem>
        <Button variant="primary" onClick={onToggleModal}>
          Create Job
        </Button>
      </ToolbarItem>
    </React.Fragment>
  );

  return (
    <Toolbar id="toolbar-items-example">
      <ToolbarContent>{items}</ToolbarContent>
    </Toolbar>
  );
};
