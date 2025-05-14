import React, { useState } from 'react';
import { Class, Subject } from '@/types/add_types';
import { FaTrash } from 'react-icons/fa';

interface Props {
  classes: Class[];
  subjects: Subject[];
  onEdit: (subject: Subject, index: number) => void;
  onDelete: (id?: string) => void;
  onAdd: () => void;
}

export function SubjectSection({ classes, subjects, onEdit, onDelete, onAdd }: Props) {
  const [selectedClassId, setSelectedClassId] = useState<string>('all');

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClassId(e.target.value);
  };

  const filteredSubjects =
    selectedClassId === 'all'
      ? subjects
      : subjects.filter(subject => subject.class_id.toString() === selectedClassId);

  return (
    <div className="mb-70 border rounded p-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Subject List</h2>
        <div className="flex items-center space-x-4">
          {/* <label htmlFor="classFilter" className="font-medium">Filter by Class:</label>
          <select
            id="classFilter"
            className="border rounded px-2 py-1"
            value={selectedClassId}
            onChange={handleClassChange}
          >
            <option value="all">All Classes</option>
            {classes.map(c => (
              <option key={c._id} value={c._id}>
                {c.class_name}
              </option>
            ))}
          </select> */}
        </div>

        <button className="bg-green-700 text-white px-4 py-2 rounded" onClick={onAdd}>
          + Add Subject
        </button>
      </div>

      <table className="w-full border border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Class Name</th>
            <th className="border p-2">Subject Name</th>
            <th className="border p-2">Actions</th>
            <th className="border p-2">View All</th>
          </tr>
        </thead>
        <tbody>
          {[...filteredSubjects]
            .sort((a, b) => {
              const classA = classes.find(c => c._id === a.class_id.toString())?.class_name || '';
              const classB = classes.find(c => c._id === b.class_id.toString())?.class_name || '';
              const numA = parseInt(classA);
              const numB = parseInt(classB);
              return numA - numB;
            })
            .map((s) => {
              const originalIndex = filteredSubjects.findIndex(fs => fs._id === s._id);
              return (
                <tr key={s._id} className="odd:bg-gray-50">
                  <td className="border p-2">
                    {classes.find(c => c._id === s.class_id.toString())?.class_name || 'NA'}
                  </td>
                  <td className="border p-2">{s.subject_name}</td>
                  <td className="border p-2">
                    <div>
                      <button
                        className="btn btn-warning me-4"
                        onClick={() => onEdit(s, originalIndex)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger me-2"
                        onClick={() => onDelete(s._id)}
                      >
                        <FaTrash className="my-1" />
                      </button>
                    </div>
                  </td>
                  <td className="border p-2">
                    <a
                      target="_blank"
                      href={`/admin/chapter?class_id=${s.class_id}&subject_id=${s._id}`}
                      className="btn btn-primary me-2"
                    >
                      View Chapters
                    </a>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
