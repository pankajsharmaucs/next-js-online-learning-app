'use client';

import * as Tabs from '@radix-ui/react-tabs';
import DOMPurify from 'dompurify';
import React, { useEffect, useState } from 'react';
import VimeoPlayer from '../player/VimeoPlayer';
import { getLogginedUserData } from '@/utlis/checkAdminLogin';
import axios from 'axios';

interface QA {
  question: string;
  answer: string;
}

export interface TabAssessment {
  assessment_id: string;
  title: string;
  questions: {
    question: string;
    options: string[];
    answer: 'a' | 'b' | 'c' | 'd';
  }[];
}

export interface ChapterTabData {
  chapter_id: string;
  chapter_name: string;
  introduction?: string;
  summary?: string;
  moral?: string;
  video_url?: string;
  pdf?: string;
  questions: QA[];
  assessments: TabAssessment[];
}

interface AssessmentState {
  answers: string[];
  submitted: boolean;
  score: number | null;
}

export default function ChapterTabs({ data }: { data: ChapterTabData }) {
  const [activeTab, setActiveTab] = useState('Introduction');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [savedScores, setSavedScores] = useState<Record<string, number>>({});
  const [assessmentStates, setAssessmentStates] = useState<AssessmentState[]>(
    data.assessments.map(asmt => ({
      answers: Array(asmt.questions.length).fill(''),
      submitted: false,
      score: null,
    }))
  );

  const ASSESSMENT_API = process.env.NEXT_PUBLIC_USER_ASSESSMENT!;

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getLogginedUserData();
      if (user?.email) {
        setUserEmail(user.email);

        const scores: Record<string, number> = {};

        for (const asmt of data.assessments) {
          try {
            const res = await axios.get(ASSESSMENT_API, {
              params: {
                user_id: user.email,
                chapter_id: data.chapter_id,
                assessment_id: asmt.assessment_id,
              },
            });

            const result = res.data;
            if (result?.success && result.submitted) {
              scores[asmt.title] = result.data.score;
            }
          } catch (err) {
            console.error(`Error checking submission for ${asmt.title}`, err);
          }
        }

        setSavedScores(scores);
      }
    };

    fetchUser();
  }, [data.assessments, data.chapter_id]);

  return (
    <Tabs.Root className="w-full" defaultValue="Introduction" onValueChange={setActiveTab}>
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

      {/* Introduction */}
      <Tabs.Content value="Introduction" className="space-y-4 shadow p-4 border">
        {data.introduction && (
          <p
            className="text-gray-700 p-4"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.introduction) }}
          />
        )}
      </Tabs.Content>

      {/* Summary */}
      <Tabs.Content value="Summary" className="space-y-4 shadow p-4 border">
        {data.summary && (
          <p
            className="text-gray-700 p-4"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.summary) }}
          />
        )}
      </Tabs.Content>

      {/* Moral */}
      <Tabs.Content value="Moral" className="space-y-4 shadow p-4 border">
        {data.moral && (
          <p
            className="text-gray-700 p-4"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.moral) }}
          />
        )}
      </Tabs.Content>

      {/* Video */}
      <Tabs.Content value="video" className="aspect-video w-full overflow-hidden rounded-lg shadow p-4 border">
        { activeTab === 'video' && data.video_url ? (
          <VimeoPlayer videoId={data.video_url} />
        ) : (
          activeTab === 'video' && <p className="text-gray-500">No video available.</p>
        )}
      </Tabs.Content>

      {/* PDF */}
      <Tabs.Content value="pdf" className="shadow p-4 border">
        {data.pdf ? (
          <div className="w-full h-[500px] overflow-hidden">
            <iframe src={data.pdf} className="w-full h-full" title="PDF Viewer" />
          </div>
        ) : (
          <p className="text-gray-500">No PDF available.</p>
        )}
      </Tabs.Content>

      {/* Q&A */}
      <Tabs.Content value="qa" className="space-y-4 shadow p-4 border">
        {data.questions.length > 0 ? (
          data.questions.map((qa, i) => (
            <div key={i} className="bg-gray-50 border-l-4 border-blue-500 px-2 rounded">
              <div className="font-semibold text-gray-800 flex">
                Q{i + 1}:&nbsp;
                <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(qa.question) }} />
              </div>
              <p className="text-sm text-gray-900 mt-1 flex">
                A:&nbsp;
                <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(qa.answer) }} />
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No Q&A available.</p>
        )}
      </Tabs.Content>

      {/* Assessments */}
      <Tabs.Content value="assessments" className="shadow p-4 border">
        {data.assessments.length > 0 ? (
          data.assessments.map((asmt, i) => {
            const assessment = assessmentStates[i];
            const existingScore = savedScores[asmt.title];

            const handleSelect = (qIndex: number, value: string) => {
              setAssessmentStates(prev => {
                const updated = [...prev];
                updated[i].answers[qIndex] = value;
                return [...updated];
              });
            };

            const handleSubmit = async () => {
              const answers = assessmentStates[i].answers;
              let marks = 0;

              asmt.questions.forEach((q, idx) => {
                if (answers[idx] === q.answer) marks++;
              });

              if (!userEmail) return;

              const payload = {
                user_id: userEmail,
                chapter_id: data.chapter_id,
                assessment_id: asmt.assessment_id,
                questions: asmt.questions.map((q, idx) => ({
                  question: q.question,
                  selected: answers[idx],
                  correct: q.answer,
                  options: q.options,
                })),
                score: marks,
              };

              try {
                const res = await axios.post(ASSESSMENT_API, payload);

                if (res.data.success) {
                  setSavedScores(prev => ({ ...prev, [asmt.title]: marks }));
                  setAssessmentStates(prev => {
                    const updated = [...prev];
                    updated[i] = {
                      answers,
                      submitted: true,
                      score: marks,
                    };
                    return updated;
                  });
                }
              } catch (error) {
                console.error('Error submitting assessment:', error);
              }
            };

            return (
              <div key={i} className="bg-gray-50 p-4 rounded border border-blue-100 mb-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-800">{asmt.title}</h3>

                {asmt.questions.map((q, j) => (
                  <div key={j} className="mb-4">
                    <p className="font-medium text-gray-800">Q{j + 1}: {q.question}</p>
                    <div className="pl-2 mt-2 flex gap-2 flex-wrap">
                      {q.options.map((opt, idx) => {
                        const optionKey = ['a', 'b', 'c', 'd'][idx];
                        const selected = assessment.answers[j] === optionKey;

                        return (
                          <button
                            key={idx}
                            type="button"
                            className={`px-4 py-2 rounded border text-sm transition-all ${selected
                              ? 'bg-blue-800 text-white'
                              : 'bg-white text-gray-800'
                              }`}
                            onClick={() => handleSelect(j, optionKey)}
                            disabled={assessment.submitted || !!existingScore}
                          >
                            {optionKey.toUpperCase()}. {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {!existingScore ? (
                  <div>
                    <p>Check all and click to submit assessment</p>
                    <button
                      className="bg-green-600 text-white px-4 py-2 rounded mt-4"
                      onClick={handleSubmit}
                      disabled={assessment.answers.includes('')}
                    >
                      Submit Assessment
                    </button>
                  </div>
                ) : (
                  <div>
                    <p>Assessment Already submitted</p>
                    <h1 className="text-green-700 mt-4 font-semibold">
                      🎉 Score: {savedScores[asmt.title]}/{asmt.questions.length}
                    </h1>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-gray-500">No assessments available.</p>
        )}
      </Tabs.Content>
    </Tabs.Root>
  );
}
