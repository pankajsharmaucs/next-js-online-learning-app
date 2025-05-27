import React, { useState } from 'react';
import { FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Board } from '@/types/add_types';

interface Props {
  boards: Board[];
  onEdit: (board: Board, index: number) => void;
  onDelete: (id?: string) => void;
  onAdd: () => void;
}

export function BoardSection({ boards, onEdit, onDelete, onAdd }: Props) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => setIsCollapsed(prev => !prev);

  // Sort boards alphabetically by board_name
  const sortedBoards = [...boards].sort((a, b) => a.board_name.localeCompare(b.board_name));

  return (
    <div className="mb-20 border rounded p-2 bg-white">
      <div className="flex justify-between items-center ">
        <h1 className="textTitle w-[150px]">Boards</h1>
        <div className="flex items-center gap-10">
          <button className="addButton text-white px-4 py-2 rounded w-[150px]" onClick={onAdd}>
            + Add Board
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
                <th className="border p-2">Board Name</th>
                <th className="border p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedBoards.map((b, i) => (
                <tr key={b._id} className="odd:bg-gray-50">
                  <td className="border p-2">{i + 1}</td>
                  <td className="border p-2">{b.board_name}</td>
                  <td className="border p-2 text-center">
                    <button className="btn btn-warning me-4" onClick={() => onEdit(b, i)}>
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => onDelete(b._id)}>
                      <FaTrash className="my-1" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
