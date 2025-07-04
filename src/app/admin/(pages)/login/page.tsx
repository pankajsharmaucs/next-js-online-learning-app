"use client"

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { showSuccessToast, showErrorToast, showWarningToast } from '@/components/alert/AlertToast';

const Page = () => {
  const [email, setEmail] = useState('pankaj@gmail.com');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // Hook to handle navigation

  // Admin login function
  async function adminLogin(email: string, password: string) {
    const loginPath = process.env.NEXT_PUBLIC_ADMIN_LOGIN_URL;
    const baseUrl = window.location.origin; // Dynamically gets the current host (e.g., 'https://your-frontend-domain.com')

    const loginUrl = `${baseUrl}${loginPath}`; // Combine base URL and relative path

    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post(
        loginUrl,
        { email, password },
        { withCredentials: true } // Important to accept cookies
      );

      if (response.status === 200) {
        showSuccessToast('Logged in successfully!');
        router.push('/admin/dashboard');
      } else {
        // This is rare, since other statuses will likely go to catch
        showErrorToast('Access Denied!');
      }

    } catch (error: any) {
      setIsLoading(false);

      if (error.response) {
        const status = error.response.status;

        if (status === 401) {
          showWarningToast('Unauthorized: Please check your credentials.');
        } else if (status === 403) {
          showWarningToast('Account is inactive.');
        } else {
          showErrorToast(`Login failed: ${error.response.data?.message || 'Unexpected error'}`);
        }
      } else {
        // No response from server
        showErrorToast(`Login failed: ${error.message}`);
      }

      console.error('Login error:', error);

    } finally {
      setIsLoading(false);
    }


  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      adminLogin(email, password);
    } else {
      setErrorMessage('Please fill in both email and password.');
    }
  };

  return (
    <>
      <div className="sign__shape">
        <img className="man-1" src="/img/icon/sign/man-1.png" alt="" />
        <img className="man-2" src="/img/icon/sign/man-2.png" alt="" />
        <img className="circle" src="/img/icon/sign/circle.png" alt="" />
        <img className="zigzag" src="/img/icon/sign/zigzag.png" alt="" />
        <img className="dot" src="/img/icon/sign/dot.png" alt="" />
        <img className="bg" src="/img/icon/sign/sign-up.png" alt="" />
      </div>
      <div className="container mt-100">
        <div className="row">
          <div className="col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2">
            <div className="section__title-wrapper text-center mb-55">
              <h2 className="" >
                 Login to <br /> Admin Dashboard.
              </h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xxl-6 offset-xxl-3 col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
            <div className="sign__wrapper white-bg">
              <div className="sign__form">
                <form onSubmit={handleSubmit}>
                  <div className="sign__input-wrapper mb-25">
                    <h5>Admin email</h5>
                    <div className="sign__input">
                      <input
                        type="email"
                        placeholder="e-mail address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <i className="fal fa-envelope" />
                    </div>
                  </div>
                  <div className="sign__input-wrapper mb-10">
                    <h5>Password</h5>
                    <div className="sign__input">
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <i className="fal fa-lock" />
                    </div>
                  </div>

                  {errorMessage && <div className="error-message">{errorMessage}</div>}

                  <button type="submit" className="e-btn w-100" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Sign In'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
