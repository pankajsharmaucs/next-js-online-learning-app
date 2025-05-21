import React, { useState, FormEvent, useEffect } from 'react';
import axios from 'axios';

interface Question {
    question: string;
    options: string[];
    answer: string;
}

interface AssessmentData {
    title: string;
    description: string;
    questions: Question[];
}

interface Props {
    selectedChapterId: string | null;
    token: string;
    onClose: () => void;
    showSuccessToast: (msg: string) => void;
    showErrorToast: (msg: string) => void;
}

function AddAssessmentForm(props: Props) {
    const { selectedChapterId, token, onClose, showSuccessToast, showErrorToast } = props;
    const [assessmentId, setAssessmentId] = useState<string | null>(null);

    const [assessmentData, setAssessmentData] = useState<AssessmentData>({
        title: '',
        description: '',
        questions: [
            {
                question: '',
                options: ['', '', '', ''],
                answer: '',
            },
        ],
    });

    const handleAssessmentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setAssessmentData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleQuestionChange = (
        index: number,
        field: 'question' | 'answer' | 'options',
        value: string,
        optionIndex?: number
    ) => {
        const updatedQuestions = [...assessmentData.questions];

        if (field === 'options' && optionIndex !== undefined) {
            updatedQuestions[index].options[optionIndex] = value;
        } else {
            (updatedQuestions[index] as any)[field] = value;
        }

        setAssessmentData((prev) => ({
            ...prev,
            questions: updatedQuestions,
        }));
    };

    const addQuestion = () => {
        setAssessmentData((prev) => ({
            ...prev,
            questions: [
                ...prev.questions,
                {
                    question: '',
                    options: ['', '', '', ''],
                    answer: '',
                },
            ],
        }));
    };

    const removeQuestion = (index: number) => {
        setAssessmentData((prev) => ({
            ...prev,
            questions: prev.questions.filter((_, i) => i !== index),
        }));
    };


    useEffect(() => {
        const fetchAssessment = async () => {
            if (!selectedChapterId) return;

            try {
                const base_url = window.origin;
                const url = base_url + process.env.NEXT_PUBLIC_ADMIN_GET_ALL_ASSESMENT;

                const res = await axios.get(`${url}?chapterId=${selectedChapterId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const existing = res.data;
                if (existing && existing._id) {
                    setAssessmentId(existing._id); // Track for PUT later
                    setAssessmentData({
                        title: existing.title,
                        description: existing.description,
                        questions: existing.questions,
                    });
                }
            } catch (error) {
                console.error("No existing assessment or fetch failed", error);
            }
        };

        fetchAssessment();
    }, [selectedChapterId]);

    // const submitAssessment = async (e: FormEvent) => {
    //     e.preventDefault();
    //     if (!selectedChapterId) {
    //         showErrorToast('Chapter ID not selected');
    //         return;
    //     }

    //     const base_url = window.origin;
    //     const url = base_url + process.env.NEXT_PUBLIC_ADMIN_GET_ALL_ASSESMENT;

    //     try {
    //         await axios.post(url,
    //             {
    //                 chapterId: selectedChapterId,
    //                 ...assessmentData,
    //             },
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             }
    //         );
    //         showSuccessToast('Assessment created successfully');
    //         onClose();
    //     } catch (error: any) {
    //         console.error('Failed to add assessment:', error);
    //         showErrorToast('Failed to create assessment');
    //     }
    // };


    const submitAssessment = async (e: FormEvent) => {
        e.preventDefault();
        if (!selectedChapterId) {
            showErrorToast('Chapter ID not selected');
            return;
        }

        try {

            const base_url = window.origin;
            const url = base_url + process.env.NEXT_PUBLIC_ADMIN_GET_ALL_ASSESMENT;

            const payload = {
                chapterId: selectedChapterId,
                ...assessmentData,
            };

            const headers = {
                Authorization: `Bearer ${token}`,
            };

            if (assessmentId) {
                // Update existing
                await axios.put(url, { _id: assessmentId, ...payload }, { headers });
                showSuccessToast('Assessment updated successfully');
            } else {
                // Create new
                const res = await axios.post(url, payload, { headers });
                setAssessmentId(res.data.id); // Store for future updates
                showSuccessToast('Assessment created successfully');
            }

            onClose();
        } catch (error) {
            console.error('Failed to save assessment:', error);
            showErrorToast('Failed to save assessment');
        }
    };

    return (
        <form onSubmit={submitAssessment} className="space-y-6">
            <input
                type="text"
                name="title"
                value={assessmentData.title}
                onChange={handleAssessmentChange}
                placeholder="Assessment Title"
                className="w-full border p-2 rounded mb-2"
                required
            />
            <textarea
                name="description"
                value={assessmentData.description}
                onChange={handleAssessmentChange}
                placeholder="Assessment Description"
                className="w-full border p-2 rounded mb-2"
            />

            {assessmentData.questions.map((q, qIndex) => (
                <div key={qIndex} className="border p-4 rounded bg-gray-100 my-4 space-y-3">
                    <div className="flex justify-between items-center">
                        <h3 className="text-base font-semibold">Question {qIndex + 1}</h3>
                        <button type="button" onClick={() => removeQuestion(qIndex)} className="text-red-400 underline text-sm">
                            Remove
                        </button>
                    </div>

                    <input
                        type="text"
                        value={q.question}
                        onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                        placeholder="Question"
                        className="w-full border p-2 rounded bg-white mb-1"
                        required
                    />

                    <div className="flex flex-wrap gap-2">
                        {q.options.map((opt, optIndex) => (
                            <input
                                key={optIndex}
                                type="text"
                                value={opt}
                                onChange={(e) => handleQuestionChange(qIndex, 'options', e.target.value, optIndex)}
                                placeholder={`Option ${optIndex + 1}`}
                                className="flex-1 min-w-[45%] sm:min-w-[22%] border p-2 rounded bg-white mb-1"
                                required
                            />
                        ))}
                    </div>

                    <select
                        value={q.answer}
                        onChange={(e) => handleQuestionChange(qIndex, 'answer', e.target.value)}
                        className="w-full border p-2 rounded bg-white mb-1"
                        required
                    >
                        <option value="">Select Correct Answer</option>
                        <option value="a">Option A</option>
                        <option value="b">Option B</option>
                        <option value="c">Option C</option>
                        <option value="d">Option D</option>
                    </select>
                </div>
            ))}

            <button
                type="button"
                onClick={addQuestion}
                className="bg-gray-500 text-white px-4 py-2 me-3 p-2 rounded hover:bg-gray-600"
            >
                Add More
            </button>

            <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 me-3 p-2 rounded hover:bg-blue-700"
            >
                {assessmentId ? 'Update Assessment' : 'Save Assessment'}
            </button>
        </form>
    );
}

export default AddAssessmentForm;
