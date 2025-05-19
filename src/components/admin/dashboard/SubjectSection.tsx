import React, { useState } from 'react';
import { Class, Subject } from '@/types/add_types';
import { FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface Props {
  classes: Class[];
  subjects: Subject[];
  onEdit: (subject: Subject, index: number) => void;
  onDelete: (id?: string) => void;
  onAdd: () => void;
}

export function SubjectSection({ classes, subjects, onEdit, onDelete, onAdd }: Props) {
  const [selectedClassId, setSelectedClassId] = useState<string>('all');
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClassId(e.target.value);
  };

  const toggleCollapse = () => setIsCollapsed(prev => !prev);

  const filteredSubjects =
    selectedClassId === 'all'
      ? subjects
      : subjects.filter(subject => subject.class_id.toString() === selectedClassId);

  return (
    <div className="mb-20 border rounded p-2 bg-white">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="textTitle w-[150px]">Subjects</h1>
          <select
            id="classFilter"
            className="custom-select1"
            value={selectedClassId}
            onChange={handleClassChange}
          >
            <option value="all">All Classes</option>
            {classes.map(c => (
              <option key={c._id} value={c._id}>
                {c.class_name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-10">
          <button className="addButton text-white px-4 py-2 rounded w-[150px]" onClick={onAdd}>
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
                <th className="border p-2">Class Name</th>
                <th className="border p-2">Subject Name</th>
                <th className="border p-2 text-center">Actions</th>
                <th className="border p-2 text-center">View All</th>
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
                  const originalIndex = subjects.findIndex(fs => fs._id === s._id); // fixed here
                  return (
                    <tr key={s._id} className="odd:bg-gray-50">
                      <td className="border p-2">
                        {classes.find(c => c._id === s.class_id.toString())?.class_name || 'NA'}
                      </td>
                      <td className="border p-2">{s.subject_name}</td>
                      <td className="border p-2 text-center">
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
                      <td className="border p-2 text-center ">
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
                })
              }
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
