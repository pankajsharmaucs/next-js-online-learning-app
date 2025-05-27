'use client';

import { getLogginedUser } from '@/utlis/checkAdminLogin';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { showErrorToast } from '@/components/alert/AlertToast';

interface PurchasedClass {
  _id: string;
  class_id: string;
  user_id: string;
  createdAt: string;
  // Add more fields from SoldClass model if needed
}

function Page() {
  const [purchasedClasses, setPurchasedClasses] = useState<PurchasedClass[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPurchasedClasses = async () => {
    try {
      const user_data = await getLogginedUser();

      if (!user_data?.email || !user_data?.token) {
        showErrorToast('User not authenticated');
        return;
      }

      const baseUrl = window.location.origin;
      const url = `${baseUrl}${process.env.NEXT_PUBLIC_USER_FETCH_CLASS}`;

      const response = await axios.post(url, {
        email: user_data.email,
        token: user_data.token,
      });

      if (response.data?.data) {
        setPurchasedClasses([response.data.data]); // Assuming one class per user per request
      } else {
        setPurchasedClasses([]);
      }
    } catch (error) {
      console.error('Error fetching purchased classes:', error);
      showErrorToast('Failed to fetch purchased classes');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchasedClasses();
  }, []);

  return (
    <div className="container">
      <h2 className="section__title mb-4">Purchased Classes</h2>

      <div className="bg-white p-4 border rounded shadow-sm overflow-auto">
        <table className="min-w-full table-auto border border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-2 text-[13px]">S.No.</th>
              <th className="border p-2 text-[13px]">Class ID</th>
              <th className="border p-2 text-[13px]">User ID</th>
              <th className="border p-2 text-[13px]">Purchased On</th>
              <th className="border p-2 text-[13px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center p-4">Loading...</td>
              </tr>
            ) : purchasedClasses.length > 0 ? (
              purchasedClasses.map((item, index) => (
                <tr key={item._id} className="odd:bg-gray-50">
                  <td className="border p-2 text-[13px]">{index + 1}</td>
                  <td className="border p-2 text-[13px]">{item.class_id}</td>
                  <td className="border p-2 text-[13px]">{item.user_id}</td>
                  <td className="border p-2 text-[13px]">{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="border p-2">
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      onClick={() => {
                        // Replace with actual navigation logic
                        alert(`Opening class: ${item.class_id}`);
                      }}
                    >
                      Open Class
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-4">No purchased classes found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;
