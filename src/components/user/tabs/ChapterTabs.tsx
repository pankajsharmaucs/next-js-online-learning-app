'use client';

import * as Tabs from '@radix-ui/react-tabs';
import DOMPurify from 'dompurify';
import React, { useState } from 'react';
import VimeoPlayer from '../player/VimeoPlayer';

interface QA {
  question: string;
  answer: string;
}

interface Assessment {
  title: string;
  marks: number;
}

interface ChapterTabData {
  chapter_name: string;
  introduction?: string;
  summary?: string;
  moral?: string;
  video_url?: string;
  pdf?: string;
  questions: QA[];
  assessments: Assessment[];
}

export default function ChapterTabs({ data }: { data: ChapterTabData }) {
  const [activeTab, setActiveTab] = useState('Introduction');

  return (
    <Tabs.Root
      className="w-full"
      defaultValue="Introduction"
      onValueChange={(value) => setActiveTab(value)}
    >
      <Tabs.List className="flex flex-wrap gap-2 border-b border-gray-200">
        {['Introduction', 'Summary', 'Moral', 'video', 'pdf', 'qa', 'assessments'].map((tab) => (
          <Tabs.Trigger
            key={tab}
            value={tab}
            className="
              px-4 py-2 text-sm font-medium text-gray-600 rounded-t-md border-b-2 border-transparent
              hover:text-blue-600 hover:border-blue-300
              data-[state=active]:text-blue-700
              data-[state=active]:border-blue-500
              data-[state=active]:bg-gray-200
              data-[state=active]:shadow
              transition-all duration-200
            "
          >
            {tab === 'qa' ? 'Q&A' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <Tabs.Content value="Introduction" className="space-y-4 shadow p-4 border">
        {data.introduction && (
          <p
            className="text-gray-700 p-4"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.introduction) }}
          />
        )}
      </Tabs.Content>

      <Tabs.Content value="Summary" className="space-y-4 shadow p-4 border">
        {data.summary && (
          <p
            className="text-gray-700 p-4"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.summary) }}
          />
        )}
      </Tabs.Content>

      <Tabs.Content value="Moral" className="space-y-4 shadow p-4 border">
        {data.moral && (
          <p
            className="text-gray-700 p-4"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.moral) }}
          />
        )}
      </Tabs.Content>

      <Tabs.Content value="video" className="aspect-video w-full overflow-hidden rounded-lg shadow p-4 border">
        {activeTab === 'video' && data.video_url ? (
          <VimeoPlayer videoId={data.video_url} />
        ) : (
          activeTab === 'video' && <p className="text-gray-500">No video available.</p>
        )}
      </Tabs.Content>

      <Tabs.Content value="pdf" className='shadow p-4 border'>
        {data.pdf ? (
          <div className="w-full h-[500px] overflow-hidden ">
            <iframe
              src={data.pdf}
              className="w-full h-full"
              title="PDF Viewer"
            />
          </div>
        ) : (
          <p className="text-gray-500">No PDF available.</p>
        )}
      </Tabs.Content>

      <Tabs.Content value="qa" className="space-y-4 shadow p-4 border">
        {data.questions.length > 0 ? (
          data.questions.map((qa, i) => (
            <div key={i} className="bg-gray-50 border-l-4 border-blue-500 px-2 rounded">
              <p className="font-semibold text-gray-800 flex ">Q{i + 1}: &nbsp; <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(qa.question), }} />
              </p>
              <p className="text-sm text-gray-700 mt-1 flex">A:{' '} &nbsp; <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(qa.answer), }} />
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No Q&A available.</p>
        )}
      </Tabs.Content>

      <Tabs.Content value="assessments" className='shadow p-4 border'>
        {data.assessments.length > 0 ? (
          <ul className="space-y-2 list-disc list-inside text-gray-700">
            {data.assessments.map((as, i) => (
              <li key={i} className="font-medium">
                {as.title} <span className="text-sm text-gray-500">({as.marks} marks)</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No assessments available.</p>
        )}
      </Tabs.Content>

    </Tabs.Root>
  );
}
