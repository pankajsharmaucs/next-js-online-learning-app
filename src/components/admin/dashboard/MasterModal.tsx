import React, { FormEvent } from 'react';
import { Board, Class, Subject } from '@/types/add_types';

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
  if (!show) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" onClick={handleBackdropClick}
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
    >
      <div className="bg-white border rounded shadow-md w-full max-w-md relative p-4">
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
                disabled={isEdit}
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

              <input
                type="hidden"
                placeholder="Board ID"
                value={classForm.board_id}
                onChange={(e) =>
                  setClassForm({ ...classForm, board_id: e.target.value })
                }
                className="w-full border p-2 rounded mb-2"
              />

              <label htmlFor="classForm">Class Name </label>
              <input
                type="text"
                placeholder="Class Name"
                value={classForm.class_name}
                onChange={(e) =>
                  setClassForm({ ...classForm, class_name: e.target.value })
                }
                className="w-full border p-2 rounded mb-2"
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
                {classes.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.class_name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Subject Name"
                value={subjectForm.subject_name}
                onChange={(e) =>
                  setSubjectForm({
                    ...subjectForm,
                    subject_name: e.target.value,
                  })
                }
                className="w-full border p-2 rounded mb-2"
              />
            </>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            {loading ? 'Saving...' : isEdit ? 'Update' : 'Add'}
          </button>
        </form>
      </div>
    </div>
  );
}
