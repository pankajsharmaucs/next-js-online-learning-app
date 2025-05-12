'use client';

import React, { useEffect, useState, ChangeEvent, FormEvent, useRef } from 'react';
import axios from 'axios';
import { showErrorToast, showSuccessToast } from '@/components/alert/AlertToast';
import { getLogginedUser } from '@/utlis/checkAdminLogin';
import { showConfirmationDialog } from '@/components/alert/AlertToast'; // adjust path as needed
import { FaTrash } from 'react-icons/fa';

interface Board {
    _id?: string;
    board_name: string;
    image: string;
}

function Page() {
    const [boards, setBoards] = useState<Board[]>([]);
    const [formData, setFormData] = useState<Board>({ board_name: '', image: '' });
    const [modalOpen, setModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editingBoardIndex, setEditingBoardIndex] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    
    const fetchBoards = async () => {
        try {
            const baseUrl = window.location.origin;
            const url = `${baseUrl}${process.env.NEXT_PUBLIC_ADMIN_GET_ALL_BOARD}`;
            const res = await axios.get(url);
            setBoards(res.data);
        } catch (error) {
            console.error('Error fetching boards:', error);
            showErrorToast('Failed to fetch boards');
        }
    };

    const fetchAdminToken = async () => {
        const userData = await getLogginedUser();
        if (userData && typeof userData !== 'boolean' && userData.data?.user_data?.token) {
            setToken(userData.data.user_data.token);
        }
    };

    useEffect(() => {
        fetchBoards();
        fetchAdminToken();
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setModalOpen(false);
                setEditMode(false);
                setEditingBoardIndex(null);
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
        const url = `${baseUrl}${process.env.NEXT_PUBLIC_ADMIN_GET_ALL_BOARD}`;

        try {
            if (!formData.board_name || !formData.image) {
                showErrorToast('All fields are mandatory');
                return;
            }

            const headers = {
                Authorization: `Bearer ${token}`,
            };

            if (editMode && editingBoardIndex !== null) {
                await axios.put(url, formData, { headers });
                showSuccessToast('Board updated successfully');
            } else {
                await axios.post(url, formData, { headers });
                showSuccessToast('Board added successfully');
            }

            fetchBoards();
            setModalOpen(false);
            setFormData({ board_name: '', image: '' });
            setEditMode(false);
            setEditingBoardIndex(null);
        } catch (error: any) {
            console.error('Submission error:', error);
            const message = error?.response?.data?.error || 'Operation failed';
            showErrorToast(message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (_id?: string) => {
        if (!_id) return;

        const isConfirmed = await showConfirmationDialog(
            'Are you sure you want to delete this board?',
            'This action cannot be undone.'
        );
        if (!isConfirmed) return;

        const baseUrl = window.location.origin;
        const url = `${baseUrl}${process.env.NEXT_PUBLIC_ADMIN_GET_ALL_BOARD}`;

        try {
            await axios.delete(url, {
                data: { _id },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            showSuccessToast('Board deleted successfully');
            fetchBoards();
        } catch (error: any) {
            console.error('Delete error:', error);
            const message = error?.response?.data?.error || 'Failed to delete board';
            showErrorToast(message);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 d-flex justify-between items-center mb-4">
                    <h2 className="section__title">Education Boards</h2>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={() => {
                            setModalOpen(true);
                            setEditMode(false);
                            setFormData({ board_name: '', image: '' });
                        }}
                    >
                        + Add Board
                    </button>
                </div>

                <div className="col-12">
                    <div className="overflow-auto bg-white p-4 border rounded shadow-sm">
                        <table className="min-w-full table-auto border border-collapse">
                            <thead>
                                <tr className="bg-gray-100 text-left">
                                    <th className="border p-2 text-sm">S.No.</th>
                                    <th className="border p-2 text-sm">Board Name</th>
                                    <th className="border p-2 text-sm">Image</th>
                                    <th className="border p-2 text-sm">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {boards.length > 0 ? (
                                    boards.map((board, index) => (
                                        <tr key={board._id || index} className="odd:bg-gray-50">
                                            <td className="border p-2 text-sm">{index + 1}</td>
                                            <td className="border p-2 text-sm">{board.board_name}</td>
                                            <td className="border p-2 text-sm">{board.image}</td>
                                            <td className="border p-2">
                                                <button
                                                    className="btn btn-warning py-1 me-2"
                                                    onClick={() => {
                                                        setEditMode(true);
                                                        setEditingBoardIndex(index);
                                                        setFormData(board);
                                                        setModalOpen(true);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger py-2 flex items-center gap-1"
                                                    onClick={() => handleDelete(board._id)}
                                                    title="Delete"
                                                >
                                                    <FaTrash className="text-white" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="text-center p-4">
                                            No boards available.
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
                                setEditingBoardIndex(null);
                            }}
                        >
                            ✕
                        </button>
                        <h4 className="text-lg font-semibold mb-4">{editMode ? 'Edit Board' : 'Add New Board'}</h4>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {editMode && (
                                <input
                                    hidden
                                    type="text"
                                    name="board_id"
                                    value={formData._id}
                                    readOnly
                                />
                            )}
                            <input
                                type="text"
                                name="board_name"
                                value={formData.board_name}
                                onChange={handleChange}
                                placeholder="Board Name"
                                className="w-full border p-2 rounded mb-2"
                            />
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="Image URL"
                                className="w-full border p-2 rounded mb-2"
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                            >
                                {isLoading ? 'Processing...' : editMode ? 'Update Board' : 'Add Board'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Page;
