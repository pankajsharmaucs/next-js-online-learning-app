// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Header from './components/header/page';

interface ClassType {
  class_id: number;
  class_name: string;
  board_id : string;
}


export default function Home() {
  const [Class, setClass] = useState<ClassType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClass = async () => {
      const res = await fetch('/api/class');
      const data = await res.json();
      setClass(data.classes);
      setLoading(false);
    };

    fetchClass();
  }, []);
  return (
    <>
      {/* <Header /> */}

      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">User List</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="min-w-fit bg-white border border-gray-200 shadow rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3 border-b">ID</th>
                <th className="text-left p-3 border-b">Name</th>
                <th className="text-left p-3 border-b">Email</th>
              </tr>
            </thead>
            <tbody>
              {Class.length === 0 ? (
                <tr>
                  <td className="p-3" colSpan={3}>No Class found.</td>
                </tr>
              ) : (
                Class.map(data => (
                  <tr key={data.class_id} className="hover:bg-gray-50">
                    <td className="p-3 border-b">{data.class_id }</td>
                    <td className="p-3 border-b">{data.class_name }</td>
                    <td className="p-3 border-b">{data.board_id }</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </main>


    </>
  );
}
