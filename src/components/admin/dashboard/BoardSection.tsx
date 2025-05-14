import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { Board } from '@/types/add_types';

interface Props {
  boards: Board[];
  onEdit: (board: Board, index: number) => void;
  onDelete: (id?: string) => void;
  onAdd: () => void;
}

export function BoardSection({ boards, onEdit, onDelete, onAdd }: Props) {
  return (
    <div className="mb-70 border rounded p-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Boards</h2>
        <button className="bg-green-700 text-white px-4 py-2 rounded" onClick={onAdd}>
          + Add Board
        </button>
      </div>
      <table className="w-full border border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Board Name</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {boards.map((b, i) => (
            <tr key={b._id} className="odd:bg-gray-50">
              <td className="border p-2">{i + 1}</td>
              <td className="border p-2">{b.board_name}</td>
              <td className="border p-2">
                <button className="btn btn-warning me-4" onClick={() => onEdit(b, i)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => onDelete(b._id)}>
                  <FaTrash className='my-1' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
