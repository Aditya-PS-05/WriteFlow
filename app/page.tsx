'use client';
import Editor from '@/components/Editor';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">WriteFlow</h1>
      <Editor />
    </div>
  );
}