'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Heading from '@tiptap/extension-heading';
import { Editor } from '@tiptap/core';
import { useEffect } from 'react';
import { Undo2, Redo2, Bold, Italic, Underline as UnderlineIcon, Strikethrough, Quote, List, ListOrdered, Code, Heading1, Heading2, Heading3 } from 'lucide-react';

interface Props {
  content: string;
  onChange: (html: string) => void;
}

const TiptapEditor = ({ content, onChange }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content]);

  const MenuButton = ({
    onClick,
    active,
    icon,
    label,
  }: {
    onClick: () => void;
    active?: boolean;
    icon: React.ReactNode;
    label: string;
  }) => (
    <button
      onClick={onClick}
      className={`p-2 rounded hover:bg-gray-200 transition ${
        active ? 'bg-blue-100 text-blue-600' : ''
      }`}
      title={label}
    >
      {icon}
    </button>
  );

  const MenuBar = ({ editor }: { editor: Editor | null }) => {
    if (!editor) return null;

    return (
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-300 p-2 mb-2 bg-white rounded-t">
        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          icon={<Bold size={16} />}
          label="Bold"
        />
        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          icon={<Italic size={16} />}
          label="Italic"
        />
        <MenuButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive('underline')}
          icon={<UnderlineIcon size={16} />}
          label="Underline"
        />
        <MenuButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive('strike')}
          icon={<Strikethrough size={16} />}
          label="Strikethrough"
        />
        <MenuButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive('blockquote')}
          icon={<Quote size={16} />}
          label="Blockquote"
        />
        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
          icon={<List size={16} />}
          label="Bullet List"
        />
        <MenuButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
          icon={<ListOrdered size={16} />}
          label="Numbered List"
        />
        <MenuButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive('codeBlock')}
          icon={<Code size={16} />}
          label="Code Block"
        />
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive('heading', { level: 1 })}
          icon={<Heading1 size={16} />}
          label="H1"
        />
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive('heading', { level: 2 })}
          icon={<Heading2 size={16} />}
          label="H2"
        />
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive('heading', { level: 3 })}
          icon={<Heading3 size={16} />}
          label="H3"
        />
        <MenuButton
          onClick={() => editor.chain().focus().undo().run()}
          icon={<Undo2 size={16} />}
          label="Undo"
        />
        <MenuButton
          onClick={() => editor.chain().focus().redo().run()}
          icon={<Redo2 size={16} />}
          label="Redo"
        />
      </div>
    );
  };

  return (
    <div className="border rounded shadow-sm">
      <MenuBar editor={editor} />
      <div className="min-h-[200px] p-4 bg-white rounded-b prose max-w-none">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TiptapEditor;
