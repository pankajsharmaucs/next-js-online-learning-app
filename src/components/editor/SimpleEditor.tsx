import React from 'react';
import { DefaultEditor, ContentEditableEvent } from 'react-simple-wysiwyg';

interface SimpleEditorProps {
  value: string;
  onChange: (html: string) => void;
  id?: string;
}

const SimpleEditor: React.FC<SimpleEditorProps> = ({ value, onChange, id }) => {
  const handleChange = (e: ContentEditableEvent) => {
    onChange(e.target.value);
  };

  return (
    <div
      id={id}
      className="mainEditorBox border rounded shadow-sm bg-white p-4 min-h-[200px]">
      <DefaultEditor value={value} onChange={handleChange} tagName="div" />
    </div>
  );
};

export default SimpleEditor;
