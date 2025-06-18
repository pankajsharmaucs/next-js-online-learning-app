'use client';

import React, { useEffect, useState } from 'react';
import './add.css'
import axios from 'axios';
import { BoardSection } from '@/components/admin/dashboard/BoardSection';
import { Board, Class, Subject } from '@/types/add_types';
import { showConfirmationDialog, showErrorToast, showSuccessToast, showWarningToast } from '@/components/alert/AlertToast';
import AddMasterClass from '@/components/admin/dashboard/AddMasterClass';
import AddMasterSubject from '@/components/admin/dashboard/AddMasterSubject';

const MasterPage: React.FC = () => {
    const [boards, setBoards] = useState<Board[]>([]);
    const [classes, setClasses] = useState<Class[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [baseUrl, setBaseUrl] = useState('');


    const [boardForm, setBoardForm] = useState<Board>({ board_name: '' });
    const [classForm, setClassForm] = useState<Class>({ class_id: '', class_name: '', board_id: '' });
    const [subjectForm, setSubjectForm] = useState<Subject>({ class_name: '', class_id: '', subject_name: '', overview: '', image: '' });

    const [modalType, setModalType] = useState<'board' | 'class' | 'subject' | null>(null);
    const [isEdit, setIsEdit] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const ALL_BOARD = baseUrl + process.env.NEXT_PUBLIC_ADMIN_GET_ALL_BOARD;
    const ALL_CLASS = baseUrl + process.env.NEXT_PUBLIC_ADMIN_GET_ALL_CLASS;
    const ALL_SUBJECT = baseUrl + process.env.NEXT_PUBLIC_ADMIN_GET_ALL_SUBJECT;

    useEffect(() => {
        setBaseUrl(window.location.origin);
        fetchAll();
    }, []);

    const fetchAll = async () => {

        const [b, c, s] = await Promise.all([
            fetch(ALL_BOARD).then(res => res.json()),
            fetch(ALL_CLASS).then(res => res.json()),
            fetch(ALL_SUBJECT).then(res => res.json()),
        ]);
        setBoards(b);
        setClasses(c);
        setSubjects(s);
    };

    const openModal = (type: typeof modalType, edit = false, index: number | null = null) => {
        setModalType(type);
        setIsEdit(edit);
        setEditIndex(index);

        if (type === 'board') {
            setBoardForm(edit && index !== null ? boards[index] : { board_name: '' });
        } else if (type === 'class') {
            setClassForm(edit && index !== null ? classes[index] : { class_id: '', board_id: '', class_name: '' });
        } else if (type === 'subject') {
            setSubjectForm(edit && index !== null ? subjects[index] : { class_name: '', class_id: '', subject_name: '', overview: '', image: '' });
        }
    };

    const closeModal = () => {
        setModalType(null);
        setIsEdit(false);
        setEditIndex(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let url = '';
            let method = isEdit ? 'PUT' : 'POST';
            let options: RequestInit = { method };
            let body;

            if (modalType === 'board') {
                url = `${ALL_BOARD}`;
                body = JSON.stringify(boardForm);
                options.headers = { 'Content-Type': 'application/json' };
                options.body = body;
            } else if (modalType === 'class') {
                url = `${ALL_CLASS}`;
                body = JSON.stringify(classForm);
                options.headers = { 'Content-Type': 'application/json' };
                options.body = body;
            } else if (modalType === 'subject') {
                url = `${ALL_SUBJECT}`;
                const formData = new FormData();
                formData.append('subject_name', subjectForm.subject_name);
                formData.append('class_id', subjectForm.class_id);
                if (isEdit && subjectForm._id) formData.append('_id', subjectForm._id);
                if (subjectForm.image instanceof File) {
                    formData.append('image', subjectForm.image);
                }

                options.body = formData; // Don't set Content-Type here
            }

            // console.log(options); return

            const resp = await fetch(url, options);

            switch (resp.status) {
                case 200:
                    fetchAll();
                    closeModal();
                    showSuccessToast(isEdit ? 'Updated successfully' : 'Added successfully');
                    break;
                case 409:
                    showErrorToast('Already Exists.');
                    break;
                case 400:
                    showErrorToast('Bad Request: Please check the input data.');
                    break;
                case 401:
                    showErrorToast('Unauthorized: Please log in again.');
                    break;
                case 403:
                    showErrorToast('Forbidden: You do not have permission.');
                    break;
                case 500:
                    showErrorToast('Server Error: Please try again later.');
                    break;
                default:
                    showErrorToast(`Unexpected error: ${resp.status}`);
            }
        } catch (err) {
            console.error(err);
            showErrorToast('Network error: Failed to send request.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (type: 'boards' | 'classes' | 'subjects', id?: string) => {
        if (!id) return;

        const isConfirmed = await showConfirmationDialog(
            'Are you sure you want to delete this class?',
            'This action cannot be undone.'
        );
        if (!isConfirmed) return;

        try {
            const response = await axios.delete(`/api/admin/${type}`, {
                data: { id },
            });

            if (response.status === 200) {
                fetchAll();
                showSuccessToast('Deleted successfully');
            } else {
                showErrorToast('Unexpected response from server');
            }

        } catch (err: any) {
            if (err.response) {
                const status = err.response.status;

                switch (status) {
                    case 400:
                        showWarningToast('Cannot delete class – dependent subjects exist.');
                        break;
                    case 402:
                        showErrorToast('Payment required or quota exceeded.');
                        break;
                    default:
                        showErrorToast(`Unexpected error (status: ${status}).`);
                        break;
                }
            } else {
                console.error(err);
                showErrorToast('Network or server error occurred.');
            }
        }
    };

    return (
        <div className="p-4 space-y-10">
            <BoardSection
                boards={boards}
                onEdit={(b, i) => openModal('board', true, i)}
                onDelete={(id) => handleDelete('boards', id)}
                onAdd={() => openModal('board')}
            />
            <AddMasterClass />

            <AddMasterSubject />

        </div>
    );
};

export default MasterPage;
