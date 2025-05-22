'use client';

import React, { useEffect, useState, ChangeEvent, FormEvent, useRef } from 'react';
import axios from 'axios';
import { showErrorToast, showSuccessToast, showConfirmationDialog } from '@/components/alert/AlertToast';
import { getLogginedUser } from '@/utlis/checkAdminLogin';
import { FaTrash } from 'react-icons/fa';
import { useSearchParams } from 'next/navigation';
import './chapter.css';
import AddAssessmentForm from './AddAssessmentForm'; // adjust path as needed
import ChapterQuestionAnswerForm from './ChapterQuestionAnswerForm';

import dynamic from 'next/dynamic';
const TiptapEditor = dynamic(() => import('@/components/editor/Editor'), { ssr: false });
import SimpleEditor from '@/components/editor/SimpleEditor';


interface ChapterForm {
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

interface Subject {
    _id: string;
    subject_name: string;
}

interface ClassItem {
    _id: string;
    class_name: string;
}

function Page() {
    const searchParams = useSearchParams();
    const classIdFromUrl = searchParams.get('class_id') || '';
    const subjectIdFromUrl = searchParams.get('subject_id') || '';

    const [ClassID, setClassID] = useState<string>('');
    const [subjectID, setsubjectID] = useState<string>('');

    const [chapters, setChapters] = useState<any[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [classes, setClasses] = useState<ClassItem[]>([]);
    const [formData, setFormData] = useState<ChapterForm>({
        _id: '',
        subject_id: '',
        class_id: '',
        chapter_name: '',
        introduction: '',
        summary: '',
        moral: '',
        video_url: '',
        video_access: 'free',
        assignment_access: 'free',
        pdf: '',
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    const [showAssessmentForm, setShowAssessmentForm] = useState(false);
    const [showQuestionAnswerForm, setShowQuestionAnswerForm] = useState(false);
    const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);

    const addAssessments = (chapterId: string) => {
        setSelectedChapterId(chapterId);
        setShowQuestionAnswerForm(false);
        setShowAssessmentForm(true);
    };

    const addQuestionAnswer = (chapterId: string) => {
        setSelectedChapterId(chapterId);
        setShowAssessmentForm(false);
        setShowQuestionAnswerForm(true);
    };

    const handleCloseAssessmentForm = () => {
        setSelectedChapterId(null);
        setShowAssessmentForm(false);
    };


    const CHAPTER_API = process.env.NEXT_PUBLIC_ADMIN_GET_ALL_CHAPTER;
    const ALL_CLASS = process.env.NEXT_PUBLIC_ADMIN_GET_ALL_CLASS;
    const ALL_SUBJECT = process.env.NEXT_PUBLIC_ADMIN_GET_ALL_SUBJECT;

    const fetchClasses = async () => {
        try {
            const baseUrl = window.location.origin;
            const res = await axios.get(`${baseUrl}${ALL_CLASS}`);
            setClasses(res.data);

        } catch (error) {
            console.error('Error fetching classes:', error);
            showErrorToast('Failed to fetch classes');
        }
    };

    const fetchSubjects = async () => {
        try {
            const baseUrl = window.location.origin;
            const res = await axios.get(`${baseUrl}${ALL_SUBJECT}`);
            setSubjects(res.data);
        } catch (error) {
            console.error('Error fetching subjects:', error);
            showErrorToast('Failed to fetch subjects');
        }
    };


    const getClassName = (id: string) => {
        const found = classes.find(cls => cls._id === id);
        return found?.class_name || 'Unknown Class';
    };

    const getSubjectName = (id: string) => {
        const found = subjects.find(sub => sub._id === id);
        // console.log(found);
        return found?.subject_name || 'Unknown Subject';
    };

    const fetchChapters = async () => {
        if (!classIdFromUrl || !subjectIdFromUrl) return;

        try {
            const baseUrl = window.location.origin;
            const res = await axios.get(`${baseUrl}${CHAPTER_API}?class_id=${classIdFromUrl}&subject_id=${subjectIdFromUrl}`);
            setChapters(res.data);
            // console.log(res.data);
        } catch (error) {
            console.error('Error fetching chapters:', error);
            showErrorToast('Failed to fetch chapters');
        }
    };

    const fetchAdminToken = async () => {
        const userData = await getLogginedUser();
        if (userData && typeof userData !== 'boolean' && userData.data?.user_data?.token) {
            setToken(userData.data.user_data.token);
        }
    };

    useEffect(() => {
        fetchSubjects();
        fetchClasses();
        fetchAdminToken();
        fetchChapters();

        // Set class ID and subject ID from URL
        setClassID(classIdFromUrl);
        setsubjectID(subjectIdFromUrl);
        // console.log(formData);


    }, []);


    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;

        // Handle file input separately
        if (type === 'file') {
            const fileInput = e.target as HTMLInputElement; // Type assertion
            const file = fileInput.files ? fileInput.files[0] : null; // safely handle file
            setFormData(prev => ({ ...prev, [name]: file }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const baseUrl = window.location.origin;

        try {
            const headers = { Authorization: `Bearer ${token}` };

            if (!formData.chapter_name || !subjectID || !ClassID) {
                showErrorToast('All fields are required');
                return;
            }

            const formDataToSubmit = new FormData();

            formDataToSubmit.append('subject_id', subjectID);
            formDataToSubmit.append('class_id', ClassID);
            formDataToSubmit.append('chapter_name', formData.chapter_name);
            formDataToSubmit.append('introduction', formData.introduction || '');
            formDataToSubmit.append('summary', formData.summary || '');
            formDataToSubmit.append('moral', formData.moral || '');
            formDataToSubmit.append('video_url', formData.video_url || '');
            formDataToSubmit.append('video_access', formData.video_access || 'free');
            formDataToSubmit.append('assignment_access', formData.assignment_access || 'free');

            // console.log(formData);return


            // If a file is selected, append it to the form data
            if (formData.pdf && formData.pdf instanceof File) {
                formDataToSubmit.append('pdf', formData.pdf);
            }

            if (editMode && formData._id) {
                formDataToSubmit.append('_id', formData._id); // ✅ Append the _id explicitly
                await axios.put(`${baseUrl}${CHAPTER_API}`, formDataToSubmit, { headers });
                showSuccessToast('Chapter updated successfully');
            } else {
                await axios.post(`${baseUrl}${CHAPTER_API}`, formDataToSubmit, { headers });
                showSuccessToast('Chapter added successfully');
            }

            setModalOpen(false);
            setFormData({
                _id: '', subject_id: '', class_id: '', chapter_name: '', introduction: '', summary: '', moral: '', video_url: '',
                video_access: 'free', assignment_access: 'free', pdf: ''
            });
            setEditMode(false);
            fetchChapters();
        } catch (error: any) {
            console.error('Submit error:', error);
            showErrorToast(error?.response?.data?.error || 'Operation failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (_id?: string) => {
        if (!_id) return;

        const isConfirmed = await showConfirmationDialog(
            'Are you sure you want to delete this chapter?',
            'This action cannot be undone.'
        );
        if (!isConfirmed) return;

        try {
            const baseUrl = window.location.origin;
            await axios.delete(`${baseUrl}${CHAPTER_API}`, {
                data: { _id },
                headers: { Authorization: `Bearer ${token}` },
            });

            showSuccessToast('Chapter deleted successfully');
            fetchChapters();
        } catch (error: any) {
            console.error('Delete error:', error);
            showErrorToast(error?.response?.data?.error || 'Failed to delete chapter');
        }
    };


    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setModalOpen(false);
            setEditMode(false);
        }
    };


    return (
        <div className="container">
            <div className="row">
                <div className="col-12 d-flex justify-between items-center mb-4">
                    <div>

                        <h6>
                            Class: {classes.length ? getClassName(classIdFromUrl) : 'Loading...'} /  {subjects.length ? getSubjectName(subjectIdFromUrl) : 'Loading...'}
                        </h6>

                        <h2 className="section__title">Chapter List</h2>
                    </div>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={() => {
                            setModalOpen(true);
                            setEditMode(false);
                            setFormData({
                                _id: '', subject_id: '', class_id: '', chapter_name: '', introduction: '', summary: '', moral: '', video_url: '',
                                video_access: 'free', assignment_access: 'free', pdf: ''
                            });
                        }}
                    >
                        + Add
                    </button>
                </div>

                <div className="col-12">
                    <div className="overflow-auto bg-white p-4 border rounded shadow-sm">
                        <table className="min-w-full table-auto border border-collapse">
                            <thead>
                                <tr className="bg-gray-100 text-left">
                                    <th className="border p-2 text-sm">S.No.</th>
                                    <th className="border p-2 text-sm">Chapter Name</th>
                                    <th className="border p-2 text-sm">Video Url</th>
                                    <th className="border p-2 text-sm">Is Free Video</th>
                                    <th className="border p-2 text-sm">Is Free Assesments</th>
                                    <th className="border p-2 text-sm">Pdf</th>
                                    <th className="border p-2 text-sm">Add</th>
                                    <th className="border p-2 text-sm">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {chapters.length > 0 ? (
                                    chapters.map((item, index) => (
                                        <tr key={item._id} className="odd:bg-gray-50">
                                            <td className="border p-2 text-sm">{index + 1}</td>
                                            <td className="border p-2 text-sm">{item.chapter_name}</td>
                                            <td className="border p-2 text-sm">{item.video_url}</td>
                                            <td className="border p-2 text-sm">{item.video_access}</td>
                                            <td className="border p-2 text-sm">{item.assignment_access}</td>
                                            <td className="border p-2 text-sm">
                                                {item.pdf ? (
                                                    <a
                                                        href={item.pdf}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 underline"
                                                    >
                                                        View PDF
                                                    </a>
                                                ) : (
                                                    'No PDF'
                                                )}
                                            </td>
                                            <td className="border p-2">

                                                <button
                                                    className="btn btn-outline-success py-2 me-3  flex items-center gap-1 mb-1"
                                                    onClick={() => addAssessments(item._id)}
                                                    title="Add_edit" >
                                                    Add/Edit Assesments
                                                </button>


                                                <button
                                                    className="btn btn-outline-success py-2 me-3  flex items-center gap-1 mb-1"
                                                    onClick={() => addQuestionAnswer(item._id)}
                                                    title="Add_edit" >
                                                    Add/Edit Q/A
                                                </button>


                                            </td>

                                            <td className="border p-2">

                                                <button
                                                    className="btn btn-warning py-1 me-1 mb-1"
                                                    onClick={() => {
                                                        setFormData(item);
                                                        setEditMode(true);
                                                        setModalOpen(true);
                                                    }}
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="btn btn-secondary py-2 me-1 flex items-center gap-1 mb-1"
                                                    onClick={() => handleDelete(item._id)}
                                                    title="Delete"
                                                >
                                                    <FaTrash className="text-white" />
                                                </button>

                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={8} className="text-center p-4 text-gray-500">
                                            {chapters.length === 0 ? 'No chapters found.' : 'Loading...'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
                    onClick={handleBackdropClick}
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }} >
                    <div className="bg-white rounded shadow-lg max-h-[90vh] overflow-y-auto  max-w-8xl p-6">
                        <div ref={modalRef} className="w-full border bg-white rounded-lg shadow-xl relative" style={{ padding: "20px" }}>
                            <button className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-2xl"
                                onClick={() => {
                                    setModalOpen(false);
                                    setEditMode(false);
                                }} > ✕ </button>

                            <h4 className="text-2xl font-bold text-center mb-6">
                                {editMode ? 'Edit Chapter' : 'Add New Chapter'}
                            </h4>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input type="hidden" name="class_id" value={ClassID} />
                                <input type="hidden" name="subject_id" value={subjectID} />

                                <input
                                    type="text"
                                    name="chapter_name"
                                    value={formData.chapter_name}
                                    onChange={handleChange}
                                    placeholder="Chapter Name"
                                    className="w-full border p-2 rounded mb-2"
                                    required
                                />

                                <div className="chapter-editor-layout">
                                    <div className="editor-block">
                                        <label className="font-bold">Introduction</label>
                                        <SimpleEditor
                                            value={formData.introduction || ''}
                                            onChange={(html) =>
                                                setFormData((prev) => ({ ...prev, introduction: html }))
                                            }
                                        />
                                    </div>

                                    <div className="editor-block">
                                        <label className="font-bold">Summary</label>
                                        <SimpleEditor
                                            value={formData.summary || ''}
                                            onChange={(html) =>
                                                setFormData((prev) => ({ ...prev, summary: html }))
                                            }
                                        />
                                    </div>

                                    <div className="editor-block">
                                        <label className="font-bold">Moral</label>
                                        <SimpleEditor
                                            value={formData.moral || ''}
                                            onChange={(html) =>
                                                setFormData((prev) => ({ ...prev, moral: html }))
                                            }
                                        />
                                    </div>
                                </div>



                                <div className="flex align-items-center gap-4 mb-2">
                                    <input
                                        type="text"
                                        name="video_url"
                                        value={formData.video_url}
                                        onChange={handleChange}
                                        placeholder="Video URL"
                                        className="col-md-3 border p-2 rounded my-4 h-[40px]"
                                    />
                                    <select
                                        name="video_access"
                                        value={formData.video_access}
                                        onChange={handleChange}
                                        className="col-md-3 border p-2 rounded h-[40px]"
                                    >
                                        <option value="free">Free Video</option>
                                        <option value="paid">Paid Video</option>
                                    </select>

                                    <select
                                        name="assignment_access"
                                        value={formData.assignment_access}
                                        onChange={handleChange}
                                        className="col-md-3 border p-2 rounded h-[40px]"
                                    >
                                        <option value="free">Free Assignment</option>
                                        <option value="paid">Paid Assignment</option>
                                    </select>
                                </div>

                                <div className="flex gap-4 my-4">
                                    <div className='col-md-3 '>
                                        <label htmlFor="" className='font-bold '>Select PDF</label>
                                        <input
                                            type="file"
                                            name="pdf"
                                            onChange={handleChange}
                                            className="w-full border p-2 rounded mb-2"
                                        />
                                    </div>
                                    {editMode && formData.pdf && typeof formData.pdf === 'string' && (
                                        <div className="mt-2 col-md-3 overflow-hidden">
                                            <label htmlFor="" className='font-bold '>Current PDF</label>
                                            <iframe
                                                src={formData.pdf}
                                                title="PDF Preview"
                                                width="100%"
                                                height="300px"
                                                className="border rounded mb-100"
                                            />
                                        </div>
                                    )}
                                </div>


                                <button
                                    type="submit"
                                    className="w-[200px] bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                                >
                                    {isLoading ? 'Processing...' : editMode ? 'Update Chapter' : 'Add Chapter'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {showAssessmentForm && selectedChapterId && (
                <div className="fixed inset-0 bg-white bg-opacity-40 flex justify-center items-center z-50 px-4">
                    <div className="bg-white border rounded-lg w-full max-w-5xl overflow-y-auto max-h-[90vh] p-6 relative"
                        style={{ padding: "16px" }} >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Add/Edit Assessment</h2>
                            <button onClick={handleCloseAssessmentForm} className="text-red-500 text-5xl" style={{ fontSize: "46px" }}>×</button>
                        </div>

                        <AddAssessmentForm
                            selectedChapterId={selectedChapterId}
                            token={token!}
                            onClose={handleCloseAssessmentForm}
                            showSuccessToast={showSuccessToast}
                            showErrorToast={showErrorToast}
                        />
                    </div>
                </div>
            )}


            {showQuestionAnswerForm && selectedChapterId && (
                <div className="fixed inset-0 bg-white bg-opacity-40 flex justify-center items-center z-50 px-4">
                    <div className="bg-white border rounded-lg w-full max-w-5xl overflow-y-auto max-h-[90vh] p-6 relative"
                        style={{ padding: "16px" }} >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Add/Edit Q/A</h2>
                            <button onClick={handleCloseAssessmentForm} className="text-red-500 text-5xl" style={{ fontSize: "46px" }}>×</button>
                        </div>

                        <ChapterQuestionAnswerForm
                            selectedChapterId={selectedChapterId}
                            token={token!}
                            onClose={handleCloseAssessmentForm}
                            showSuccessToast={showSuccessToast}
                            showErrorToast={showErrorToast}
                        />
                    </div>
                </div>
            )}

        </div>
    );
}

export default Page;
