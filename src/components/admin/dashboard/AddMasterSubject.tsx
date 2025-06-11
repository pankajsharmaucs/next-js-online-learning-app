'use client';

import React, { useEffect, useState } from 'react';
import { FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import { showConfirmationDialog, showErrorToast, showSuccessToast } from '@/components/alert/AlertToast';

interface Subject {
  _id?: string;
  subject_name: string;
}

export default function AddMasterSubject() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editSubject, setEditSubject] = useState<Subject | null>(null);
  const base_url = window.origin;
  const url = base_url + process.env.NEXT_PUBLIC_ADMIN_GET_MASTER_SUBJECT;

  // 🔄 Fetch subjects
  const fetchSubjects = async () => {
    try {
      const res = await axios.get(url);
      setSubjects(res.data || []);
      console.log(res.data);

    } catch (err) {
      showErrorToast('Failed to load subjects');
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  // ➕ Add or ✏️ Edit subject
  const handleSubmit = async () => {
    if (!inputValue.trim()) {
      showErrorToast('Subject name is required');
      return;
    }

    try {
      if (editSubject) {
        await axios.put(url, {
          _id: editSubject._id,
          subject_name: inputValue.trim(),
        });
        showSuccessToast('Subject updated');
      } else {
        await axios.post(url, {
          subject_name: inputValue.trim(),
        });
        showSuccessToast('Subject added');
      }

      setModalOpen(false);
      setInputValue('');
      setEditSubject(null);
      fetchSubjects();
    } catch (err: any) {
      showErrorToast(err?.response?.data?.error || 'Something went wrong');
    }
  };

  // 🗑️ Delete subject
  const handleDelete = async (id?: string) => {
    const isConfirmed = await showConfirmationDialog(
      'Are you sure you want to delete this class?',
      'This action cannot be undone.'
    );
    if (!isConfirmed || !id) return;

    try {
      await axios.delete(url, { data: { id } });
      showSuccessToast('Subject deleted');
      fetchSubjects();
    } catch (err) {
      showErrorToast('Failed to delete subject');
    }
  };

  const toggleCollapse = () => setIsCollapsed(prev => !prev);

  const openModal = (subject?: Subject) => {
    if (subject) {
      setEditSubject(subject);
      setInputValue(subject.subject_name);
    } else {
      setEditSubject(null);
      setInputValue('');
    }
    setModalOpen(true);
  };

  return (
    <div className="mb-20 border rounded p-2 bg-white">
      <div className="flex justify-between items-center pt-1">
        <h1 className="textTitle">Subjects</h1>
        <div className="flex items-center gap-10">
          <button className="addButton text-white px-4 py-2 rounded w-[150px]" onClick={() => openModal()}>
            + Add Subject
          </button>
          <button
            className="text-white bg-gray-500 cursor-pointer hover:text-black mr-20 rounded"
            onClick={toggleCollapse}
            title="Toggle Table"
          >
            {isCollapsed ? <FaChevronDown className="text-1xl m-2" /> : <FaChevronUp className="text-1xl m-2" />}
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <div className="max-h-[400px] overflow-y-auto mt-3 border rounded">
          <table className="w-full border border-collapse">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="border p-2">#</th>
                <th className="border p-2">Subject Name</th>
                <th className="border p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((s, index) => (
                <tr key={s._id} className="odd:bg-gray-50">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{s.subject_name}</td>
                  <td className="border p-2 text-center">
                    <button
                      className="btn btn-warning me-4"
                      onClick={() => openModal(s)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(s._id)}
                    >
                      <FaTrash className="my-1" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{editSubject ? 'Edit Subject' : 'Add Subject'}</h2>
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              className="w-full border p-2 rounded mb-4"
              placeholder="Enter subject name"
            />
            <div className="flex justify-end gap-3">
              <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSubmit}>
                {editSubject ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
