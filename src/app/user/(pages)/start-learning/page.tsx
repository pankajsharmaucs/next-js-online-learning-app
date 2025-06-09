'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

import { checkUserClassAccess } from '@/utlis/checkClassAccess';
import { showErrorToast } from '@/components/alert/AlertToast';
import { getLogginedUserData } from '@/utlis/checkAdminLogin';
import ChapterTabs from '@/components/user/tabs/ChapterTabs';
import Breadcrumbs from '@/components/user/breadcrum/Breadcrumbs';

interface Chapter {
    _id?: string;
    subject_id: string;
    class_id: string;
    chapter_name: string;
    introduction?: string;
    summary?: string;
    moral?: string;
    video_url?: string;
    video_access?: 'free' | 'paid';
    assignment_access?: 'free' | 'paid';
    pdf?: File | string;
}

export interface QuestionAnswer {
    _id: string;
    chapterId: string;
    pageRef: string;
    question: string;
    answers: string[];
}

export interface AssessmentQuestion {
    question: string;
    options: string[];
    answer: 'a' | 'b' | 'c' | 'd';
}

export interface Assessment {
    _id: string;
    chapterId: string;
    title: string;
    description?: string;
    questions: AssessmentQuestion[];
    createdAt?: string;
    updatedAt?: string;
}

export default function Page() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const chapter_id = searchParams.get('chapter_id');
    const classId = searchParams.get('class_id');
    const subjectId = searchParams.get('subject_id');
    const subject_name = searchParams.get('subject_name');
    const class_name = searchParams.get('class_name');

    const [authorized, setAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);

    const [chapter, setChapter] = useState<Chapter | null>(null);
    const [questionAnswers, setQuestionAnswers] = useState<QuestionAnswer[]>([]);
    const [assessment, setAssessment] = useState<Assessment | null>(null);
    const [chapters, setChapters] = useState<Chapter[]>([]);

    const CHAPTER_API = process.env.NEXT_PUBLIC_USER_FETCH_CHAPTER_DATA;

    // ✅ Verify class access
    useEffect(() => {
        const verifyAccess = async () => {
            if (!classId) {
                showErrorToast('Missing class ID in URL');
                router.push('/user/dashboard');
                return;
            }

            const hasAccess = await checkUserClassAccess(classId);
            if (!hasAccess) {
                showErrorToast('You do not have access to this class');
                router.push('/user');
                return;
            }

            setAuthorized(true);
        };

        verifyAccess();
    }, [classId, router]);

    // ✅ Fetch specific chapter data
    useEffect(() => {
        const fetchChapterAccessData = async (classId: string, chapterId: string) => {
            try {
                setLoading(true);
                const baseUrl = window.location.origin;

                const user = await getLogginedUserData();
                const userEmail = user?.email;
                if (!userEmail) return;

                const body = {
                    user_id: userEmail,
                    class_id: classId,
                    chapter_id: chapterId,
                };

                const res = await axios.post(`${baseUrl}${CHAPTER_API}`, body);
                const { chapter, questionAnswers, assessment } = res.data;

                setChapter(chapter);
                setQuestionAnswers(questionAnswers);
                setAssessment(assessment);
            } catch (error) {
                console.error('Error fetching chapter access data:', error);
                showErrorToast('Failed to fetch chapter data');
            } finally {
                setLoading(false);
            }
        };

        if (classId && chapter_id) {
            fetchChapterAccessData(classId, chapter_id);
        }
    }, [classId, chapter_id]);

    // ✅ Fetch all chapters by class & subject (your version)
    useEffect(() => {
        const fetchChapters = async () => {
            // if (!classId || !subjectId) return;

            try {
                const baseUrl = window.location.origin;
                const url = `${baseUrl}${process.env.NEXT_PUBLIC_ADMIN_GET_ALL_CHAPTER}?class_id=${classId}&subject_id=${subjectId}`;
                const res = await axios.get(url);
                setChapters(res.data || []);
            } catch (err) {
                console.error('Error fetching chapters:', err);
            }
        };

        fetchChapters();
    }, [classId, subjectId]);

    if (!authorized) {
        return <div className="p-4 text-center">Verifying access...</div>;
    }

    return (
        <div className="max-w-10xl mx-auto px-4 py-0">

            <div className='col-12 '>
                <Breadcrumbs
                    titles={['All Classes', class_name || 'All Subjects', subject_name || 'All Chapters', chapter?.chapter_name || 'Chapter']}
                    links={[
                        '/user/classes',
                        `/user/subjects?class_id=${classId}&class_name=${class_name}&class_name=${classId}`,
                        `/user/chapters?class_id=${classId}&subject_id=${subjectId}&subject_name=${subject_name}&class_name=${class_name}`,
                    ]}
                />
            </div>

            <div className='flex col-12 justify-between align-items-center bg-gray-100  gap-5 border rounded my-2 p-2'>
                <div className="text-2xl font-semibold  text-capitalize text-gray-700 ">
                    {chapter?.chapter_name || 'Loading...'}
                </div>

                {/* Chapter Navigation Chips */}
                <div className="">
                    <div>
                        <select
                            value={chapter_id || ''}
                            onChange={(e) => {
                                const selectedChapterId = e.target.value;
                                if (selectedChapterId) {
                                    router.push(`/user/start-learning?chapter_id=${selectedChapterId}&class_id=${classId}&class_name=${class_name}&subject_name=${subject_name}&subject_id=${subjectId}`);
                                }
                            }}
                            className="p-2 border rounded bg-white   w-full sm:w-auto text-sm"
                        >
                            <option value="">Select Chapter</option>
                            {chapters.map((chap) => (
                                <option key={chap._id} value={chap._id}>
                                    {chap.chapter_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="border p-4 rounded mb-6">
                {loading ? (
                    <p>Loading chapter...</p>
                ) : (
                    <ChapterTabs
                        data={{
                            chapter_id: chapter_id || '',
                            chapter_name: chapter?.chapter_name || '',
                            introduction: chapter?.introduction,
                            summary: chapter?.summary,
                            moral: chapter?.moral,
                            video_url: chapter?.video_url,
                            pdf: typeof chapter?.pdf === 'string' ? chapter?.pdf : '',
                            questions: questionAnswers.map((qa) => ({
                                question: qa.question,
                                answer: qa.answers?.[0] || '',
                            })),
                            assessments: assessment
                                ? [
                                    {
                                        assessment_id: assessment._id,
                                        title: assessment.title,
                                        questions: assessment.questions.map((q) => ({
                                            question: q.question,
                                            options: q.options,
                                            answer: q.answer,
                                        })),
                                    },
                                ]
                                : [],
                        }}
                    />
                )}
            </div>

        </div >
    );
}
