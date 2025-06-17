import React, { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Board, Class, Subject } from '@/types/add_types';
import { log } from 'console';
import SimpleEditor from '@/components/editor/SimpleEditor';

interface Props {
  type: 'board' | 'class' | 'subject';
  show: boolean;
  onClose: () => void;
  onSubmit: (e: FormEvent) => void;
  boardForm?: Board;
  classForm?: Class;
  subjectForm?: Subject;
  setBoardForm?: React.Dispatch<React.SetStateAction<Board>>;
  setClassForm?: React.Dispatch<React.SetStateAction<Class>>;
  setSubjectForm?: React.Dispatch<React.SetStateAction<Subject>>;
  boards?: Board[];
  classes?: Class[];
  loading: boolean;
  isEdit: boolean;
}

export function MasterModal({
  type,
  show,
  onClose,
  onSubmit,
  boardForm,
  classForm,
  subjectForm,
  setBoardForm,
  setClassForm,
  setSubjectForm,
  boards = [],
  classes = [],
  loading,
  isEdit,
}: Props) {
  const [classOptions, setClassOptions] = useState<Class[]>([]);
  const [subjectOptions, setSubjectOptions] = useState<Subject[]>([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_ADMIN_GET_MASTER_CLASS as string
        );
        setClassOptions(res.data || []);
      } catch (err) {
        console.error('Failed to fetch class list:', err);
      }

    };

    const fetchSubjects = async () => {
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_ADMIN_GET_MASTER_SUBJECT as string
        );
        setSubjectOptions(res.data || []);
      } catch (err) {
        console.error('Failed to fetch subject list:', err);
      }
    };

    if (show && type === 'class') {
      fetchClasses();
    }

    if (show && type === 'subject') {
      fetchClasses(); // Needed for class_id selection
      fetchSubjects();
    }


  }, [show, type]);


  if (!show) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };


  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto"
      onClick={handleBackdropClick}
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
    >
      <div
        className="relative bg-white border rounded shadow-md w-[70%] max-h-[90vh] overflow-y-auto p-4"
        onClick={(e) => e.stopPropagation()} // prevent modal from closing when clicking inside
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          ✕
        </button>
        <h3 className="text-lg font-semibold mb-4">
          {isEdit ? 'Edit' : 'Add'} {type}
        </h3>
        <form onSubmit={onSubmit}>
          {type === 'board' && boardForm && setBoardForm && (
            <input
              type="text"
              placeholder="Board Name"
              value={boardForm.board_name}
              onChange={(e) =>
                setBoardForm({ ...boardForm, board_name: e.target.value })
              }
              className="w-full border p-2 rounded mb-2"
            />
          )}

          {type === 'class' && classForm && setClassForm && (
            <>
              <select
                required
                value={classForm.board_id}
                onChange={(e) =>
                  setClassForm({ ...classForm, board_id: e.target.value })
                }
                className="w-full border p-2 rounded mb-2"
              >
                <option value="">Select Board</option>
                {boards.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.board_name}
                  </option>
                ))}
              </select>

              <label htmlFor="class_name">Class Name</label>
              <select
                id="class_name"
                value={
                  !isEdit
                    ? classForm.class_id // In Add mode, bind to class_id
                    : classOptions.find((c) => c.class_name === classForm.class_name)?._id || ''
                }
                onChange={(e) => {
                  const selectedId = e.target.value;
                  const selectedClass = classOptions.find((c) => c._id === selectedId);

                  if (!selectedClass) return;

                  if (!isEdit) {
                    // ADD MODE: update both class_id and class_name
                    setClassForm({
                      ...classForm,
                      class_id: selectedId,
                      class_name: selectedClass.class_name,
                    });
                  } else {
                    // EDIT MODE: only update class_name
                    setClassForm({
                      ...classForm,
                      class_name: selectedClass.class_name,
                      // leave class_id as-is
                    });
                  }
                }}
                className="w-full border p-2 rounded mb-2"
              >
                <option value="">Select Class</option>
                {classOptions.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.class_name}
                  </option>
                ))}
              </select>

              <input
                className="w-full border p-1 rounded mb-2"
                id="class_id"
                type="text"
                value={classForm.class_id || ''}
              />

            </>
          )}

          {type === 'subject' && subjectForm && setSubjectForm && (
            <>
              <select
                disabled={isEdit}
                value={subjectForm.class_id}
                onChange={(e) =>
                  setSubjectForm({ ...subjectForm, class_id: e.target.value })
                }
                className="w-full border p-2 rounded mb-2"
              >
                <option value="">Select Class</option>
                {classOptions.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.class_name}
                  </option>
                ))}
              </select>

              <label htmlFor="subject_name">Subject Name</label>
              <select
                id="subject_name"
                value={subjectForm.subject_name}
                onChange={(e) =>
                  setSubjectForm({ ...subjectForm, subject_name: e.target.value })
                }
                className="w-full border p-2 rounded mb-2"
              >
                <option value="">Select Subject</option>
                {subjectOptions.map((s) => (
                  <option key={s.subject_name} value={s.subject_name}>
                    {s.subject_name}
                  </option>
                ))}
              </select>

              <label className="font-bold">Overview</label>
              <SimpleEditor
                value={subjectForm?.overview }
                onChange={(html) => setSubjectForm((prev) => ({ ...prev, overview: html }))}
                id="overview" 
              />

              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setSubjectForm({ ...subjectForm, image: file });
                  }
                }}
                className="w-full border p-2 rounded mb-2"
              />
              {subjectForm.image && (
                <div className="mb-2">
                  <img
                    src={
                      typeof subjectForm.image === 'string'
                        ? subjectForm.image
                        : URL.createObjectURL(subjectForm.image)
                    }
                    alt="Preview"
                    className="h-24 w-24 object-cover rounded border"
                  />
                </div>
              )}
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${loading ? 'bg-blue-400' : 'bg-blue-600'
              } text-white py-2 rounded`}
          >
            {loading ? 'Saving...' : isEdit ? 'Update' : 'Add'}
          </button>
        </form>
      </div>
    </div>
  );
}
