import React, { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';
import { showConfirmationDialog } from '@/components/alert/AlertToast';
import SimpleEditor from '@/components/editor/SimpleEditor';

interface QAEntry {
    _id?: string;
    pageRef: string;
    question: string;
    answers: string[]; // still supporting array
}

interface Props {
    selectedChapterId: string | null;
    token: string;
    onClose: () => void;
    showSuccessToast: (msg: string) => void;
    showErrorToast: (msg: string) => void;
}

function ChapterQuestionAnswerForm({
    selectedChapterId,
    token,
    onClose,
    showSuccessToast,
    showErrorToast,
}: Props) {
    const [qaData, setQaData] = useState<QAEntry[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchExistingQA = async () => {
            if (!selectedChapterId) return;

            try {
                const baseUrl = window.origin;
                const url = baseUrl + process.env.NEXT_PUBLIC_ADMIN_CHAPTER_QA;
                const res = await axios.get(`${url}?chapterId=${selectedChapterId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.data && res.data.length > 0) {
                    setQaData(
                        res.data.map((item: any) => ({
                            _id: item._id,
                            pageRef: item.pageRef,
                            question: item.question,
                            answers: item.answers || [''],
                        }))
                    );
                } else {
                    setQaData([{ pageRef: '', question: '', answers: [''] }]);
                }
            } catch (err) {
                console.warn('No QA found or failed to fetch:', err);
                setQaData([{ pageRef: '', question: '', answers: [''] }]);
            }
        };

        fetchExistingQA();
    }, [selectedChapterId]);

    const handleQAChange = (index: number, field: 'pageRef' | 'question' | 'answer', value: string) => {
        setQaData((prev) => {
            const updated = [...prev];
            if (field === 'pageRef') {
                updated[index].pageRef = value;
            } else if (field === 'question') {
                updated[index].question = value;
            } else if (field === 'answer') {
                updated[index].answers = [value];
            }
            return updated;
        });
    };

    const addQA = () => {
        setQaData((prev) => [...prev, { pageRef: '', question: '', answers: [''] }]);
    };

    const removeQA = async (index: number) => {
        const qaToRemove = qaData[index];

        if (qaToRemove._id) {
            const confirmed = await showConfirmationDialog(
                'Are you sure?',
                'This question will be permanently deleted!'
            );
            if (!confirmed) return;
        }

        const updatedList = qaData.filter((_, i) => i !== index);
        setQaData(updatedList);

        if (qaToRemove._id) {
            try {
                const baseUrl = window.origin;
                const url = baseUrl + process.env.NEXT_PUBLIC_ADMIN_CHAPTER_QA;
                await axios.delete(`${url}?id=${qaToRemove._id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                showSuccessToast('Question removed successfully');
            } catch (err) {
                console.error('Failed to delete QA from DB:', err);
                showErrorToast('Failed to remove question from database');
            }
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!selectedChapterId) {
            showErrorToast('Chapter ID is required');
            return;
        }

        const isValid = qaData.every((qa) => qa.pageRef && qa.question && qa.answers.some((a) => a));
        if (!isValid) {
            showErrorToast('Please fill out all fields');
            return;
        }

        const baseUrl = window.origin;
        const url = baseUrl + process.env.NEXT_PUBLIC_ADMIN_CHAPTER_QA;
        const headers = { Authorization: `Bearer ${token}` };

        setIsSubmitting(true);
        try {
            for (const entry of qaData) {
                const payload = {
                    chapterId: selectedChapterId,
                    pageRef: entry.pageRef,
                    question: entry.question,
                    answers: entry.answers,
                };

                if (entry._id) {
                    await axios.put(url, { _id: entry._id, ...payload }, { headers });
                } else {
                    await axios.post(url, payload, { headers });
                }
            }

            showSuccessToast('Questions saved successfully');
            onClose();
        } catch (err) {
            console.error('Failed to save QA:', err);
            showErrorToast('Failed to save questions');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {qaData.map((qa, index) => (
                <div key={`qa-${index}`} className="border rounded p-4 bg-gray-100 space-y-2 mb-3">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold">Question {index + 1}</h3>
                        {qaData.length > 0 && (
                            <button
                                type="button"
                                onClick={() => removeQA(index)}
                                className="text-red-500 text-sm underline"
                            >
                                Remove
                            </button>
                        )}
                    </div>

                    <input
                        type="text"
                        value={qa.pageRef || ''}
                        onChange={(e) => handleQAChange(index, 'pageRef', e.target.value)}
                        placeholder="Page Reference"
                        className="w-full border p-2 rounded bg-white mb-1"
                        required
                    />

                    <div className="chapter-editor-layout">
                        <div className="editor-block">
                            <label className="font-bold">Question</label>
                            <SimpleEditor
                                key={`question-editor-${index}`} // <--- Important!
                                value={qa.question || ''}
                                onChange={(html) => handleQAChange(index, 'question', html)}
                                id={`question-${index}`} // <--- Helps isolate instances
                            />
                        </div>

                        <div className="editor-block">
                            <label className="font-bold">Answer</label>
                            <SimpleEditor
                                key={`answer-editor-${index}`} // <--- Important!
                                value={qa.answers?.[0] || ''}
                                onChange={(html) => handleQAChange(index, 'answer', html)}
                                id={`answer-${index}`} // <--- Helps isolate instances
                            />
                        </div>
                    </div>
                </div>
            ))}

            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={addQA}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                    Add More
                </button>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-blue-600 text-white rounded hover:bg-blue-700 px-4 py-2 ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    {isSubmitting ? 'Saving...' : 'Save Questions'}
                </button>
            </div>
        </form>
    );
}

export default ChapterQuestionAnswerForm;
