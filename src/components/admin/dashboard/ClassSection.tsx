import React, { useEffect, useState } from 'react';
import { Class, Board } from '@/types/add_types';
import { FaChevronDown, FaChevronUp, FaTrash } from 'react-icons/fa';
import axios from 'axios';

interface Props {
  classes: Class[];
  boards: Board[];
  onEdit: (cls: Class, index: number) => void;
  onDelete: (id?: string) => void;
  onAdd: () => void;
}

export function ClassSection({ classes, boards, onEdit, onDelete, onAdd }: Props) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selectedBoardId, setSelectedBoardId] = useState('all');

  const toggleCollapse = () => setIsCollapsed(prev => !prev);

  // Filter classes based on selectedBoardId
  const filteredClasses = selectedBoardId === 'all'
    ? classes
    : classes.filter(c => c.board_id.toString() === selectedBoardId);

  return (
    <div className="mb-20 border rounded p-2 bg-white">
      <div className="flex justify-between items-center pt-1">
        <div className="flex items-center space-x-4">
          <h1 className="textTitle w-[150px]">Classes</h1>
          <select
            className="custom-select1"
            value={selectedBoardId}
            onChange={e => setSelectedBoardId(e.target.value)}
          >
            <option value="all">All Boards</option>
            {boards.map(b => (
              <option key={b._id} value={b._id}>
                {b.board_name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-10">
          <button className="addButton text-white px-4 py-2 rounded w-[150px]" onClick={onAdd}>
            + Add Class
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
                <th className="border p-1">#</th>
                <th className="border p-1">Board</th>
                <th className="border p-1">Class Name</th>
                <th className="border p-1 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClasses.map((c, i) => (
                <tr key={c._id} className="odd:bg-gray-50">
                  <td className="border p-1">{i + 1}</td>
                  <td className="border p-1">
                    {boards.find(b => b._id === c.board_id.toString())?.board_name || 'NA'}
                  </td>
                  <td className="border p-1">{c.class_name}</td>
                  <td className="border p-1 text-center">
                    <button className="btn btn-warning me-4" onClick={() => onEdit(c, classes.findIndex(cls => cls._id === c._id))}>Edit</button>
                    <button className="btn btn-danger" onClick={() => onDelete(c._id)}>
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
