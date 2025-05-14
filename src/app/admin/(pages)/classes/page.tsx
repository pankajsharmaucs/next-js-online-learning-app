'use client';

import React, { useEffect, useState, ChangeEvent, FormEvent, useRef } from 'react';
import axios from 'axios';
import { showErrorToast, showSuccessToast } from '@/components/alert/AlertToast';
import { getLogginedUser } from '@/utlis/checkAdminLogin';
import { showConfirmationDialog } from '@/components/alert/AlertToast';
import { FaTrash } from 'react-icons/fa';

interface ClassItem {
    _id?: string;
    class_name: string;
}

function Page() {
    const [classes, setClasses] = useState<ClassItem[]>([]);
    const [formData, setFormData] = useState<ClassItem>({ class_name: '' });
    const [modalOpen, setModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editingClassIndex, setEditingClassIndex] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    const API_URL = process.env.NEXT_PUBLIC_ADMIN_GET_MASTER_CLASS;

    const fetchClasses = async () => {
        try {
            const baseUrl = window.location.origin;
            const res = await axios.get(`${baseUrl}${API_URL}`);
            setClasses(res.data);
            console.log(res);
            
        } catch (error) {
            console.error('Error fetching classes:', error);
            showErrorToast('Failed to fetch classes');
        }
    };

    const fetchAdminToken = async () => {
        const userData = await getLogginedUser();
        if (userData && typeof userData !== 'boolean' && userData.data?.user_data?.token) {
            setToken(userData.data.user_data.token);
        }
    };

    useEffect(() => {
        fetchClasses();
        fetchAdminToken();
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setModalOpen(false);
                setEditMode(false);
                setEditingClassIndex(null);
            }
        }

        if (modalOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [modalOpen]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const baseUrl = window.location.origin;

        try {
            if (!formData.class_name) {
                showErrorToast('Class name is required');
                return;
            }

            const headers = {
                Authorization: `Bearer ${token}`,
            };

            if (editMode && editingClassIndex !== null && formData._id) {
                await axios.put(`${baseUrl}${API_URL}`, formData, { headers });
                showSuccessToast('Class updated successfully');
            } else {
                await axios.post(`${baseUrl}${API_URL}`, { class_name: formData.class_name }, { headers });
                showSuccessToast('Class added successfully');
            }

            fetchClasses();
            setModalOpen(false);
            setFormData({ class_name: '' });
            setEditMode(false);
            setEditingClassIndex(null);
        } catch (error: any) {
            console.error('Submit error:', error);
            showErrorToast(error?.response?.data?.error || 'Operation failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id?: string) => {
        if (!id) return;

        const isConfirmed = await showConfirmationDialog(
            'Are you sure you want to delete this class?',
            'This action cannot be undone.'
        );
        if (!isConfirmed) return;

        try {
            const baseUrl = window.location.origin;
            await axios.delete(`${baseUrl}${API_URL}`, {
                data: { id },
                headers: { Authorization: `Bearer ${token}` },
            });

            fetchClasses();
            showSuccessToast('Class deleted successfully');
        } catch (error: any) {
            console.error('Delete error:', error);
            showErrorToast(error?.response?.data?.error || 'Failed to delete class');
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 d-flex justify-between items-center mb-4">
                    <h2 className="section__title">Class Master</h2>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={() => {
                            setModalOpen(true);
                            setEditMode(false);
                            setFormData({ class_name: '' });
                        }}
                    >
                        + Add Class
                    </button>
                </div>

                <div className="col-12">
                    <div className="overflow-auto bg-white p-4 border rounded shadow-sm">
                        <table className="min-w-full table-auto border border-collapse">
                            <thead>
                                <tr className="bg-gray-100 text-left">
                                    <th className="border p-2 text-sm">S.No.</th>
                                    <th className="border p-2 text-sm">Class Name</th>
                                    <th className="border p-2 text-sm">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classes.length > 0 ? (
                                    classes.map((item, index) => (
                                        <tr key={item._id || index} className="odd:bg-gray-50">
                                            <td className="border p-2 text-sm">{index + 1}</td>
                                            <td className="border p-2 text-sm">{item.class_name}</td>
                                            <td className="border p-2">
                                                <button
                                                    className="btn btn-warning py-1 me-2"
                                                    onClick={() => {
                                                        setEditMode(true);
                                                        setEditingClassIndex(index);
                                                        setFormData(item);
                                                        setModalOpen(true);
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
                                        <td colSpan={3} className="text-center p-4">
                                            No classes available.
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
                                setEditingClassIndex(null);
                            }}
                        >
                            ✕
                        </button>
                        <h4 className="text-lg font-semibold mb-4">{editMode ? 'Edit Class' : 'Add New Class'}</h4>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {editMode && (
                                <input hidden name="id" value={formData._id} readOnly />
                            )}
                            <input
                                type="text"
                                name="class_name"
                                value={formData.class_name}
                                onChange={handleChange}
                                placeholder="Class Name"
                                className="w-full border p-2 rounded mb-2"
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                            >
                                {isLoading ? 'Processing...' : editMode ? 'Update Class' : 'Add Class'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Page;
