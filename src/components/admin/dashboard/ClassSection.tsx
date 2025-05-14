import React from 'react';
import { Class, Board } from '@/types/add_types';
import { FaTrash } from 'react-icons/fa';

interface Props {
  classes: Class[];
  boards: Board[];
  onEdit: (cls: Class, index: number) => void;
  onDelete: (id?: string) => void;
  onAdd: () => void;
}

export function ClassSection({ classes, boards, onEdit, onDelete, onAdd }: Props) {

  return (
    <div className="mb-70 border rounded p-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Classes</h2>
        <button className="bg-green-700 text-white px-4 py-2 rounded" onClick={onAdd}>+ Add Class</button>
      </div>
      <table className="w-full border border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Board</th>
            <th className="border p-2">Class Name</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((c, i) =>

          (
            <tr key={c._id} className="odd:bg-gray-50">
              <td className="border p-2">{i + 1}</td>
              <td className="border p-2">{boards.find(b => b._id === c.board_id.toString())?.board_name || 'NA'}</td>
              <td className="border p-2">{c.class_name}</td>
              <td className="border p-2">
                <button className="btn btn-warning me-4" onClick={() => onEdit(c, i)}>Edit</button>
                <button className="btn btn-danger " onClick={() => onDelete(c._id)}> <FaTrash className='my-1' /></button>
              </td>
            </tr>
          )
          )}
        </tbody>
      </table>
    </div>
  );
}
