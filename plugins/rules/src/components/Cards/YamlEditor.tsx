import React from 'react';

import { Editor } from '@monaco-editor/react';
import { editor } from 'monaco-editor';

type Props = {
  value: any;
  onChange: (
    value: string | undefined,
    ev: editor.IModelContentChangedEvent,
  ) => void;
};

export const YamlEditor = (props: Props) => (
  <Editor
    language="yaml"
    height="30rem"
    value={props.value}
    onChange={props.onChange}
    options={{
      minimap: { enabled: false },
    }}
  />
);
