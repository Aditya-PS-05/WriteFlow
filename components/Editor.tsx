'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import { useState, useEffect } from 'react';
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  FileDown,
  Save,
  FileUp,
  Moon,
  Sun,
  Type
} from 'lucide-react';
import { exportToPDF } from '@/components/pdfExport';

const Editor = () => {
  const [content, setContent] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight,
      Underline,
    ],
    content: '',
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();
      setContent(newContent);
      
      const text = editor.getText();
      const words = text.trim().split(/\s+/).length;
      setWordCount(words);
      setReadingTime(Math.ceil(words / 200));
      
      localStorage.setItem('editorContent', newContent);
    },
    editorProps: {
      attributes: {
        class: `prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none px-8 py-6 ${
          isDarkMode 
            ? 'prose-invert prose-p:text-gray-100 prose-headings:text-gray-100' 
            : 'prose-gray'
        }`,
      },
    },
  });

  useEffect(() => {
    const savedContent = localStorage.getItem('editorContent');
    if (savedContent && editor) {
      editor.commands.setContent(savedContent);
    }
  }, [editor]);

  const handleExport = async () => {
    if (content) {
      await exportToPDF(content);
    }
  };

  const handleSave = () => {
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editor) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        editor.commands.setContent(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className={`h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      <header className={`px-4 py-2 flex items-center justify-between border-b ${
        isDarkMode 
          ? 'bg-neutral-900 border-neutral-700 text-neutral-100' 
          : 'bg-white border-gray-200 text-gray-800'
      }`}>
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">WriteFlow</h1>
          
          {/* Formatting toolbar */}
          <div className={`flex items-center gap-1 rounded-lg p-1 ${
            isDarkMode ? 'bg-neutral-800' : 'bg-gray-100'
          }`}>
            <button
              onClick={() => editor?.chain().focus().toggleBold().run()}
              className={`p-2 rounded transition-colors ${
                editor?.isActive('bold')
                  ? 'bg-blue-500 text-white'
                  : isDarkMode
                    ? 'text-neutral-100 hover:bg-neutral-700'
                    : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Bold size={16} />
            </button>
            <button
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              className={`p-2 rounded transition-colors ${
                editor?.isActive('italic')
                  ? 'bg-blue-500 text-white'
                  : isDarkMode
                    ? 'text-neutral-100 hover:bg-neutral-700'
                    : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Italic size={16} />
            </button>
            <button
              onClick={() => editor?.chain().focus().toggleUnderline().run()}
              className={`p-2 rounded transition-colors ${
                editor?.isActive('underline')
                  ? 'bg-blue-500 text-white'
                  : isDarkMode
                    ? 'text-neutral-100 hover:bg-neutral-700'
                    : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              <UnderlineIcon size={16} />
            </button>
          </div>

          {/* Alignment toolbar */}
          <div className={`flex items-center gap-1 rounded-lg p-1 ${
            isDarkMode ? 'bg-neutral-800' : 'bg-gray-100'
          }`}>
            <button
              onClick={() => editor?.chain().focus().setTextAlign('left').run()}
              className={`p-2 rounded transition-colors ${
                editor?.isActive({ textAlign: 'left' })
                  ? 'bg-blue-500 text-white'
                  : isDarkMode
                    ? 'text-neutral-100 hover:bg-neutral-700'
                    : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              <AlignLeft size={16} />
            </button>
            <button
              onClick={() => editor?.chain().focus().setTextAlign('center').run()}
              className={`p-2 rounded transition-colors ${
                editor?.isActive({ textAlign: 'center' })
                  ? 'bg-blue-500 text-white'
                  : isDarkMode
                    ? 'text-neutral-100 hover:bg-neutral-700'
                    : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              <AlignCenter size={16} />
            </button>
            <button
              onClick={() => editor?.chain().focus().setTextAlign('right').run()}
              className={`p-2 rounded transition-colors ${
                editor?.isActive({ textAlign: 'right' })
                  ? 'bg-blue-500 text-white'
                  : isDarkMode
                    ? 'text-neutral-100 hover:bg-neutral-700'
                    : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              <AlignRight size={16} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* File operations */}
          <div className="flex items-center gap-2">
            <input
              type="file"
              accept=".html,.txt"
              onChange={handleLoad}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className={`cursor-pointer flex items-center gap-1 px-3 py-1.5 rounded transition-colors ${
                isDarkMode
                  ? 'text-neutral-100 hover:bg-neutral-800'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FileUp size={16} />
              <span className="text-sm">Load</span>
            </label>
            <button
              onClick={handleSave}
              className={`flex items-center gap-1 px-3 py-1.5 rounded transition-colors ${
                isDarkMode
                  ? 'text-neutral-100 hover:bg-neutral-800'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Save size={16} />
              <span className="text-sm">Save</span>
            </button>
            <button
              onClick={handleExport}
              className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 
                       transition-colors disabled:opacity-50 flex items-center gap-1"
              disabled={!content}
            >
              <FileDown size={16} />
              <span className="text-sm">Export PDF</span>
            </button>
          </div>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded transition-colors ${
              isDarkMode
                ? 'text-neutral-100 hover:bg-neutral-800'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <main className={`flex-1 overflow-hidden ${
        isDarkMode ? 'bg-neutral-900' : 'bg-gray-50'
      }`}>
        <div className="h-full max-w-4xl mx-auto">
          <div className={`h-full shadow-lg ${
            isDarkMode 
              ? 'bg-neutral-800 text-gray-100' 
              : 'bg-white text-gray-900'
          }`}>
            <EditorContent 
              editor={editor} 
              className={`${
                isDarkMode 
                  ? '[&_.ProseMirror]:text-gray-100' 
                  : '[&_.ProseMirror]:text-gray-900'
              }`}
            />
          </div>
        </div>
      </main>

      <footer className={`px-4 py-2 flex items-center justify-between text-sm border-t ${
        isDarkMode 
          ? 'bg-neutral-900 border-neutral-700 text-neutral-300' 
          : 'bg-white border-gray-200 text-gray-600'
      }`}>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Type size={14} />
            {wordCount} words
          </span>
          <span>~{readingTime} min read</span>
        </div>
        <span>Auto-saved</span>
      </footer>
    </div>
  );
};

export default Editor;