'use client';

import { useEditor, EditorContent, Editor as TiptapEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState } from 'react';
import { 
  Bold, 
  Italic, 
  Type, 
  Heading1, 
  Heading2, 
  List 
} from 'lucide-react';

interface MenuBarProps {
  editor: TiptapEditor | null;
}

const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) return null;

  return (
    <div className="border-b border-gray-200 p-3 flex gap-2 bg-gray-50">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded-md hover:bg-gray-200 transition-colors ${
          editor.isActive('bold') ? 'bg-gray-200 text-blue-600' : 'bg-white text-gray-600'
        } disabled:opacity-50`}
        title="Bold"
      >
        <Bold size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded-md hover:bg-gray-200 transition-colors ${
          editor.isActive('italic') ? 'bg-gray-200 text-blue-600' : 'bg-white text-gray-600'
        } disabled:opacity-50`}
        title="Italic"
      >
        <Italic size={18} />
      </button>
      <div className="w-px h-6 bg-gray-300 my-auto mx-1" />
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        disabled={!editor.can().chain().focus().setParagraph().run()}
        className={`p-2 rounded-md hover:bg-gray-200 transition-colors ${
          editor.isActive('paragraph') ? 'bg-gray-200 text-blue-600' : 'bg-white text-gray-600'
        } disabled:opacity-50`}
        title="Paragraph"
      >
        <Type size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        disabled={!editor.can().chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded-md hover:bg-gray-200 transition-colors ${
          editor.isActive('heading', { level: 1 }) ? 'bg-gray-200 text-blue-600' : 'bg-white text-gray-600'
        } disabled:opacity-50`}
        title="Heading 1"
      >
        <Heading1 size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        disabled={!editor.can().chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded-md hover:bg-gray-200 transition-colors ${
          editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 text-blue-600' : 'bg-white text-gray-600'
        } disabled:opacity-50`}
        title="Heading 2"
      >
        <Heading2 size={18} />
      </button>
      <div className="w-px h-6 bg-gray-300 my-auto mx-1" />
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        disabled={!editor.can().chain().focus().toggleBulletList().run()}
        className={`p-2 rounded-md hover:bg-gray-200 transition-colors ${
          editor.isActive('bulletList') ? 'bg-gray-200 text-blue-600' : 'bg-white text-gray-600'
        } disabled:opacity-50`}
        title="Bullet List"
      >
        <List size={18} />
      </button>
    </div>
  );
};

const Editor = () => {
  const [content, setContent] = useState<string>('');

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  const handleExport = () => {
    if (content) {
      console.log('Content to export:', content);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Rich Text Editor</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 
                     transition-colors disabled:opacity-50 disabled:hover:bg-blue-600
                     flex items-center gap-2 shadow-sm"
          onClick={handleExport}
          disabled={!content}
        >
          Export to PDF
        </button>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <MenuBar editor={editor} />
        <div className="p-4">
          <EditorContent 
            editor={editor} 
            className="min-h-[600px] prose max-w-none focus:outline-none" 
          />
        </div>
      </div>
    </div>
  );
};

export default Editor;