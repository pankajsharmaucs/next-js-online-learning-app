"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { showSuccessToast, showErrorToast, showWarningToast } from '@/components/alert/AlertToast';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const userLogin = async (email: string, password: string) => {
    const loginPath = process.env.NEXT_PUBLIC_USER_LOGIN_URL;
    const baseUrl = window.location.origin;
    const loginUrl = `${baseUrl}${loginPath}`;

    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post(
        loginUrl,
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        router.push('/user/dashboard'); // Redirect to user dashboard
        showSuccessToast('Logged in successfully!');
      } else {
        showErrorToast('Access Denied!');
      }
    } catch (error: any) {
      setIsLoading(false);

      if (error.response) {
        const status = error.response.status;

        if (status === 401) {
          showWarningToast('Invalid email or password.');
        } else if (status === 403) {
          showWarningToast('Your account is inactive.');
        } else {
          showErrorToast(`Login failed: ${error.response.data?.message || 'Unexpected error'}`);
        }
      } else {
        showErrorToast(`Login failed: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      userLogin(email, password);
    } else {
      setErrorMessage('Please fill in both email and password.');
    }
  };

  return (
    <main>
      <section className="signup__area po-rel-z1 pt-140 pb-145">
        <div className="sign__shape">
          <img className="man-1" src="/img/icon/sign/man-3.png" alt="" />
          <img className="man-2 man-22" src="/img/icon/sign/man-2.png" alt="" />
          <img className="circle" src="/img/icon/sign/circle.png" alt="" />
          <img className="zigzag" src="/img/icon/sign/zigzag.png" alt="" />
          <img className="dot" src="/img/icon/sign/dot.png" alt="" />
          <img className="bg" src="/img/icon/sign/sign-up.png" alt="" />
          <img className="flower" src="/img/icon/sign/flower.png" alt="" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2">
              <div className="section__title-wrapper text-center mb-55">
                <h2 className="section__title">
                  Welcome Back <br /> Please Log In
                </h2>
                <p>Log in with your credentials below.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xxl-6 offset-xxl-3 col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
              <div className="sign__wrapper white-bg">
                <div className="sign__form">
                  <form onSubmit={handleSubmit}>
                    <div className="sign__input-wrapper mb-25">
                      <h5>Email</h5>
                      <div className="sign__input">
                        <input
                          type="email"
                          placeholder="Enter email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <i className="fal fa-envelope" />
                      </div>
                    </div>
                    <div className="sign__input-wrapper mb-25">
                      <h5>Password</h5>
                      <div className="sign__input">
                        <input
                          type="password"
                          placeholder="Enter password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <i className="fal fa-lock" />
                      </div>
                    </div>
                    {errorMessage && (
                      <p className="text-danger mb-3">{errorMessage}</p>
                    )}
                    <button className="e-btn w-100" disabled={isLoading}>
                      {isLoading ? 'Logging in...' : 'Log In'}
                    </button>
                    <div className="sign__new text-center mt-20">
                      <p>
                        Don’t have an account? <a href="/signup">Sign Up</a>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
