'use client';

import { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp, FaTrash } from 'react-icons/fa';
import { showConfirmationDialog, showErrorToast, showSuccessToast } from '@/components/alert/AlertToast';

interface Class {
  _id: string;
  class_name: string;
}

export default function AddMasterClass() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editClass, setEditClass] = useState<Class | null>(null);
  const [inputValue, setInputValue] = useState('');
  const base_url = window.origin;

  const toggleCollapse = () => setIsCollapsed(prev => !prev);

  const fetchClasses = async () => {
    try {
      const url = base_url + process.env.NEXT_PUBLIC_ADMIN_GET_MASTER_CLASS;
      const res = await fetch(url);
      const data = await res.json();
      setClasses(data);
    } catch {
      showErrorToast('Failed to load classes');
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleAddClick = () => {
    setEditClass(null);
    setInputValue('');
    setModalOpen(true);
  };

  const handleEditClick = (cls: Class) => {
    setEditClass(cls);
    setInputValue(cls.class_name);
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!inputValue.trim()) {
      showErrorToast('Class name required');
      return;
    }

    try {
      const res = await fetch('/api/master/class', {
        method: editClass ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editClass ? { _id: editClass._id, class_name: inputValue } : { class_name: inputValue }),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || 'Something went wrong');

      showSuccessToast(editClass ? 'Class updated' : 'Class added');
      setModalOpen(false);
      fetchClasses();
    } catch (err: any) {
      showErrorToast(err.message);
    }
  };

  const handleDelete = async (id?: string) => {

    const isConfirmed = await showConfirmationDialog(
      'Are you sure you want to delete this class?',
      'This action cannot be undone.'
    );
    if (!isConfirmed || !id) return;

    try {
      const res = await fetch('/api/master/class', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error('Delete failed');
      showSuccessToast('Class deleted');
      fetchClasses();
    } catch {
      showErrorToast('Error deleting class');
    }
  };

  return (
    <div className="mb-20 border rounded p-2 bg-white">
      <div className="flex justify-between items-center pt-1">
        <h1 className="textTitle">Classes</h1>
        <div className="flex gap-10">
          <button className="addButton px-4 py-2 text-white rounded w-[150px]" onClick={handleAddClick}>
            + Add Class
          </button>
          <button
            className="text-white bg-gray-500 hover:text-black mr-20 rounded"
            onClick={toggleCollapse}
            title="Toggle Table"
          >
            {isCollapsed ? <FaChevronDown className="m-2" /> : <FaChevronUp className="m-2" />}
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <div className="max-h-[400px] overflow-y-auto mt-3 border rounded">
          <table className="w-full border border-collapse">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="border p-1">#</th>
                <th className="border p-1">Class Name</th>
                <th className="border p-1 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((c, i) => (
                <tr key={c._id} className="odd:bg-gray-50">
                  <td className="border p-1">{i + 1}</td>
                  <td className="border p-1">{c.class_name}</td>
                  <td className="border p-1 text-center">
                    <button className="btn btn-warning mr-10" onClick={() => handleEditClick(c)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(c._id)}>
                      <FaTrash className="inline-block" />
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
            <h2 className="text-xl font-bold mb-4">{editClass ? 'Edit Class' : 'Add Class'}</h2>
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              className="w-full border p-2 rounded mb-4"
              placeholder="Enter class name"
            />
            <div className="flex justify-end gap-3">
              <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSubmit}>
                {editClass ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
