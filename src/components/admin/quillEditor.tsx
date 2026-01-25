'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css'; // <--- UPDATED CSS IMPORT
import styles from '@/styles/adminEditor.module.css';

// 1. Dynamic Import from 'react-quill-new'
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface RichEditorProps {
  initialValue?: string;
  name: string;
  placeholder?: string;
}

export default function RichEditor({ initialValue = '', name, placeholder }: RichEditorProps) {
  const [value, setValue] = useState(initialValue);

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'header': [2, 3, false] }],
      ['clean']
    ],
  };

  return (
    <div className={styles.editorWrapper}>
      {/* Hidden input to sync data with Server Actions */}
      <input type="hidden" name={name} value={value} />

      <ReactQuill 
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        placeholder={placeholder}
        className={styles.quill}
      />
    </div>
  );
}