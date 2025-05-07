'use client';

import { getLogginedUser } from '@/utlis/checkAdminLogin';
import React, { useEffect, useState, ChangeEvent, FormEvent, useRef } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { showErrorToast, showSuccessToast } from '@/components/alert/AlertToast';

interface User {
  user_id: string;
  email: string;
  password: string;
  role: 'user' | 'sub_admin' | 'super_admin';
  token?: string;
  superadmin_email?: string;
  active_status?: number;
}

function Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingUserIndex, setEditingUserIndex] = useState<number | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<User>({
    user_id: '',
    email: '',
    password: '',
    role: 'user',
    token: '',
    superadmin_email: '',
    active_status: 0,
  });

  const getuserdata = async () => {
    try {
      const baseUrl = window.location.origin;
      const createUrl = process.env.NEXT_PUBLIC_ADMIN_CREATE_USER;
      const Url = `${baseUrl}${createUrl}`;

      const response = await axios.get(Url);
      setUsers(response.data.users);

    } catch (error) {
      showErrorToast('Something went wrong');
      console.error('Error fetching users:', error);
    }
  };

  async function getadmindata() {
    const user_data = await getLogginedUser();
    if (user_data && typeof user_data.data.user_data.email === 'string') {
      setFormData(prev => ({
        ...prev,
        token: user_data.data.user_data.token,
        superadmin_email: user_data.data.user_data.email,
      }));
    } else {
      setFormData(prev => ({ ...prev, superadmin_email: '' }));
    }
  }

  useEffect(() => {
    getadmindata();
    getuserdata();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setModalOpen(false);
        setEditMode(false);
        setEditingUserIndex(null);
      }
    }

    if (modalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalOpen]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { user_id, email, password, role, token, superadmin_email, active_status } = formData;

      if (!email.trim() || !password.trim()) {
        showErrorToast('All fields are mandatory');
        return;
      }
      // console.log(formData); return;

      const baseUrl = window.location.origin;

      if (editMode && editingUserIndex !== null) {
        const updateUrl = `${baseUrl}${process.env.NEXT_PUBLIC_ADMIN_CREATE_USER}`; // Define this API in backend
        await axios.put(updateUrl, {
          user_id, email, password, role, token, superadmin_email, active_status
        });

        const updatedUsers = [...users];
        updatedUsers[editingUserIndex] = formData;
        setUsers(updatedUsers);
        getuserdata();
        showSuccessToast('User Updated Successfully');
      } else {
        const createUrl = `${baseUrl}${process.env.NEXT_PUBLIC_ADMIN_CREATE_USER}`;
        await axios.post(createUrl, {
          email, password, role, token, superadmin_email
        });

        setUsers(prev => [...prev, formData]);
        showSuccessToast('User Added Successfully');
      }

      setFormData({ user_id: '', email: '', password: '', role: 'user', token: '', superadmin_email: '', active_status: 1 });
      setModalOpen(false);
      setEditMode(false);
      setEditingUserIndex(null);

    } catch (error: any) {
      console.error('Error saving user:', error);
      const dbErrorCode = error?.response?.data?.details?.code;

      if (dbErrorCode === 'ER_TOO_MANY_USER_CONNECTIONS') {
        showErrorToast('Server is busy. Please try again in a moment.');
      } else {
        const message =
          error?.response?.data?.error || 'Something went wrong. Please try again.';
        showErrorToast(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex justify-between items-center mb-4">
            <h2 className="section__title">All Users</h2>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => {
                setModalOpen(true);
                setEditMode(false);
                setFormData({ user_id: '', email: '', password: '', role: 'user', token: '', superadmin_email: '' });
              }}
            >
              + Add User
            </button>
          </div>

          <div className="col-12">
            <div className="overflow-auto bg-white p-4 border rounded shadow-sm">
              <table className="min-w-full table-auto border border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="border p-2  text-[13px]">S.No.</th>
                    <th className="border p-2  text-[13px]">Email</th>
                    <th className="border p-2  text-[13px]">Role</th>
                    <th className="border p-2  text-[13px]">Status</th>
                    <th className="border p-2  text-[13px]">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index} className="odd:bg-gray-50 ">
                      <td className="border p-2  text-[13px]">{index + 1}</td>
                      <td className="border p-2  text-[13px]">{user.email}</td>
                      <td className="border p-2  text-[13px]">{user.role}</td>
                      <td className="border p-2  text-[13px]">
                        <span
                          className={
                            user.active_status === 1
                              ? 'text-green-600 font-medium'
                              : 'text-red-600 font-medium'
                          }
                        >
                          {user.active_status === 1 ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="border p-2">
                        <button
                          className="btn btn-warning py-1"
                          onClick={() => {
                            setEditMode(true);
                            setEditingUserIndex(index);
                            setFormData(users[index]);
                            setModalOpen(true);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center p-4">
                        No users available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white w-full max-w-md p-3 rounded-lg shadow-lg relative"
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl"
              onClick={() => {
                setModalOpen(false);
                setEditMode(false);
                setEditingUserIndex(null);
              }}
            >
              ✕
            </button>
            <h4 className="text-lg font-semibold mb-4">
              {editMode ? 'Edit User' : 'Add New User'}
            </h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                hidden
                type="text"
                name="user_id"
                value={formData.user_id}
                onChange={handleChange}
                placeholder="User ID"
                className="w-full border p-2 rounded mb-2"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border p-2 rounded mb-2"
              />

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full border p-2 rounded mb-2"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-2 text-blue-600 p-1"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border p-2 rounded mb-2"
              >
                <option value="user">User</option>
                <option value="sub_admin">Sub Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>


              <select
                name="active_status"
                value={formData.active_status}
                onChange={handleChange}
                className="w-full border p-2 rounded mb-2"
              >
                <option value="1">Active</option>
                <option value="0">De-Active</option>
              </select>


              <input
                hidden
                type="text"
                name="token"
                value={formData.token}
                onChange={handleChange}
              />

              <input
                hidden
                type="email"
                name="superadmin_email"
                value={formData.superadmin_email}
                onChange={handleChange}

              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 mr-2 inline" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : editMode ? 'Update User' : 'Add User'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Page;
