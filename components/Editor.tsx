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
  List,
  FileDown,
  Save,
  Share2
} from 'lucide-react';
import { exportToPDF } from './pdfExport';

interface MenuBarProps {
  editor: TiptapEditor | null;
}

const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) return null;

  return (
    <div className="flex flex-col border-b border-gray-200">
      {/* Top toolbar with file operations */}
      <div className="flex items-center gap-4 p-2 bg-gray-100 border-b border-gray-200">
        <button
          className="flex items-center gap-1 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 rounded"
          title="Save"
        >
          <Save size={16} />
          Save
        </button>
        <button
          className="flex items-center gap-1 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 rounded"
          title="Share"
        >
          <Share2 size={16} />
          Share
        </button>
      </div>

      {/* Formatting toolbar */}
      <div className="p-2 bg-white flex gap-2 flex-wrap">
        <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-md">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={`p-1.5 rounded-md hover:bg-gray-200 transition-colors ${
              editor.isActive('bold') ? 'bg-gray-200 text-blue-600' : 'text-gray-600'
            } disabled:opacity-50`}
            title="Bold (Ctrl+B)"
          >
            <Bold size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={`p-1.5 rounded-md hover:bg-gray-200 transition-colors ${
              editor.isActive('italic') ? 'bg-gray-200 text-blue-600' : 'text-gray-600'
            } disabled:opacity-50`}
            title="Italic (Ctrl+I)"
          >
            <Italic size={16} />
          </button>
        </div>

        <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-md">
          <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            disabled={!editor.can().chain().focus().setParagraph().run()}
            className={`p-1.5 rounded-md hover:bg-gray-200 transition-colors ${
              editor.isActive('paragraph') ? 'bg-gray-200 text-blue-600' : 'text-gray-600'
            } disabled:opacity-50`}
            title="Paragraph"
          >
            <Type size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            disabled={!editor.can().chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-1.5 rounded-md hover:bg-gray-200 transition-colors ${
              editor.isActive('heading', { level: 1 }) ? 'bg-gray-200 text-blue-600' : 'text-gray-600'
            } disabled:opacity-50`}
            title="Heading 1"
          >
            <Heading1 size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            disabled={!editor.can().chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-1.5 rounded-md hover:bg-gray-200 transition-colors ${
              editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 text-blue-600' : 'text-gray-600'
            } disabled:opacity-50`}
            title="Heading 2"
          >
            <Heading2 size={16} />
          </button>
        </div>

        <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-md">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            disabled={!editor.can().chain().focus().toggleBulletList().run()}
            className={`p-1.5 rounded-md hover:bg-gray-200 transition-colors ${
              editor.isActive('bulletList') ? 'bg-gray-200 text-blue-600' : 'text-gray-600'
            } disabled:opacity-50`}
            title="Bullet List"
          >
            <List size={16} />
          </button>
        </div>
      </div>
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
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none mx-auto px-8 py-6',
      },
    },
  });

  const handleExport = async () => {
    if (content) {
      await exportToPDF(content);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-800">WriteFlow</h1>
          <span className="text-sm text-gray-500">Document</span>
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 
                     transition-colors disabled:opacity-50 disabled:hover:bg-blue-600
                     flex items-center gap-2 text-sm"
          onClick={handleExport}
          disabled={!content}
        >
          <FileDown size={16} />
          Export PDF
        </button>
      </header>

      {/* Main editor area */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-5xl mx-auto">
          <div className="bg-white shadow-sm h-full border-x border-gray-200">
            <MenuBar editor={editor} />
            <div className="overflow-y-auto h-[calc(100vh-180px)]">
              <EditorContent editor={editor} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;