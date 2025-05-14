'use client';

import React, { useEffect, useState, ChangeEvent, FormEvent, useRef } from 'react';
import axios from 'axios';
import { showErrorToast, showSuccessToast, showConfirmationDialog } from '@/components/alert/AlertToast';
import { getLogginedUser } from '@/utlis/checkAdminLogin';
import { FaTrash } from 'react-icons/fa';
import { useSearchParams } from 'next/navigation';

interface ChapterForm {
    _id?: string;
    subject_id: string;
    class_id: string;
    chapter_name: string;
    summary?: string;
    video_url?: string;
    pdf?: File | string; // Change to handle file input
}

interface Subject {
    _id: string;
    subject_name: string;
}

interface ClassItem {
    _id: string;
    class_name: string;
}

interface ClassType {
    _id: string;
    class_name: string;
}

interface SubjectType {
    _id: string;
    subject_name: string;
}

function Page() {
    const searchParams = useSearchParams();
    const classIdFromUrl = searchParams.get('class_id') || '';
    const subjectIdFromUrl = searchParams.get('subject_id') || '';

    const [ClassName, setClassName] = useState<ClassType[]>([]);
    const [SubjectName, setSubjectName] = useState<SubjectType[]>([]);

    const [chapters, setChapters] = useState<any[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [classes, setClasses] = useState<ClassItem[]>([]);
    const [formData, setFormData] = useState<ChapterForm>({
        subject_id: '',
        class_id: '',
        chapter_name: '',
        summary: '',
        video_url: '',
        pdf: '',
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

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
        console.log(found);
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

            if (!formData.chapter_name || !formData.subject_id || !formData.class_id) {
                showErrorToast('All fields are required');
                return;
            }

            const formDataToSubmit = new FormData();

            formDataToSubmit.append('subject_id', formData.subject_id);
            formDataToSubmit.append('class_id', formData.class_id);
            formDataToSubmit.append('chapter_name', formData.chapter_name);
            formDataToSubmit.append('summary', formData.summary || '');
            formDataToSubmit.append('video_url', formData.video_url || '');

            // If a file is selected, append it to the form data
            if (formData.pdf && formData.pdf instanceof File) {
                formDataToSubmit.append('pdf', formData.pdf);
            }

            if (editMode && formData._id) {
                await axios.put(`${baseUrl}${CHAPTER_API}`, formDataToSubmit, { headers });
                showSuccessToast('Chapter updated successfully');
            } else {
                await axios.post(`${baseUrl}${CHAPTER_API}`, formDataToSubmit, { headers });
                showSuccessToast('Chapter added successfully');
            }

            setModalOpen(false);
            setFormData({ subject_id: '', class_id: '', chapter_name: '', summary: '', video_url: '', pdf: '' });
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
                            setFormData({ subject_id: '', class_id: '', chapter_name: '', summary: '', video_url: '', pdf: '' });
                        }}
                    >
                        + Add Chapter
                    </button>
                </div>

                <div className="col-12">
                    <div className="overflow-auto bg-white p-4 border rounded shadow-sm">
                        <table className="min-w-full table-auto border border-collapse">
                            <thead>
                                <tr className="bg-gray-100 text-left">
                                    <th className="border p-2 text-sm">S.No.</th>
                                    <th className="border p-2 text-sm">Chapter Name</th>
                                    <th className="border p-2 text-sm">Summary</th>
                                    <th className="border p-2 text-sm">Video Url</th>
                                    <th className="border p-2 text-sm">Pdf</th>
                                    <th className="border p-2 text-sm">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {chapters.length > 0 ? (
                                    chapters.map((item, index) => (
                                        <tr key={item._id} className="odd:bg-gray-50">
                                            <td className="border p-2 text-sm">{index + 1}</td>
                                            <td className="border p-2 text-sm">{item.chapter_name}</td>
                                            <td className="border p-2 text-sm">{item.summary}</td>
                                            <td className="border p-2 text-sm">{item.video_url}</td>
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
                                                    className="btn btn-warning py-1 me-2"
                                                    onClick={() => {
                                                        setEditMode(true);
                                                        setModalOpen(true);
                                                        setFormData(item);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger py-2 flex items-center gap-1"
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
                                        <td colSpan={8} className="text-center p-4">
                                            No chapters available.
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
                <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
                    <div ref={modalRef} className="bg-white w-full max-w-md p-3 rounded-lg shadow-lg relative">
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl"
                            onClick={() => {
                                setModalOpen(false);
                                setEditMode(false);
                            }}
                        >
                            ✕
                        </button>
                        <h4 className="text-lg font-semibold mb-4">{editMode ? 'Edit Chapter' : 'Add New Chapter'}</h4>
                        <form onSubmit={handleSubmit} className="space-y-4">

                            
                            <input
                                type="text"
                                name="class_id"
                                value={formData.class_id}
                                onChange={handleChange}
                                placeholder="Chapter Name"
                                className="w-full border p-2 rounded mb-2"
                                required
                            />

                            <input
                                type="text"
                                name="subject_id"
                                value={formData.subject_id}
                                onChange={handleChange}
                                placeholder="subject Name"
                                className="w-full border p-2 rounded mb-2"
                                required
                            />

                            <input
                                type="text"
                                name="chapter_name"
                                value={formData.chapter_name}
                                onChange={handleChange}
                                placeholder="Chapter Name"
                                className="w-full border p-2 rounded mb-2"
                                required
                            />

                            <textarea
                                name="summary"
                                value={formData.summary}
                                onChange={handleChange}
                                placeholder="Summary"
                                className="w-full border p-2 rounded mb-2"
                            />

                            <input
                                type="text"
                                name="video_url"
                                value={formData.video_url}
                                onChange={handleChange}
                                placeholder="Video URL"
                                className="w-full border p-2 rounded mb-2"
                            />

                            <input
                                type="file"
                                name="pdf"
                                onChange={handleChange}
                                className="w-full border p-2 rounded mb-2"
                            />

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                            >
                                {isLoading ? 'Processing...' : editMode ? 'Update Chapter' : 'Add Chapter'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Page;
