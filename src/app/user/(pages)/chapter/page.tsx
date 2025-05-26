import { Suspense } from 'react';
import Main from './Main'; // rename your original file to Page.tsx or move code here

export default function ChapterPage() {
  return (
    <Suspense fallback={<div>Loading chapter data...</div>}>
      <Main />
    </Suspense>
  );
}