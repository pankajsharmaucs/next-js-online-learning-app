"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkUserHomeLogin } from '@/utlis/checkAdminLogin';

const Page = () => {
  const router = useRouter();
  
  useEffect(() => {
    checkUserHomeLogin(router);
  }, [router]);

  return (
    <main>
      {/* sign up area start */}
      <section className="signup__area po-rel-z1 pt-100 pb-145">
        <div className="sign__shape">
          <img className="circle" src="/img/icon/sign/circle.png" alt="" />
          <img className="zigzag" src="/img/icon/sign/zigzag.png" alt="" />
          <img className="dot" src="/img/icon/sign/dot.png" alt="" />
          <img className="bg" src="/img/icon/sign/sign-up.png" alt="" />
        </div>
        <div className="container ">
          <div className="row">
            <div className="col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2">
              <div className="section__title-wrapper text-center mb-55">
                <h2 className="section__title">
                  User dashboard
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xxl-6 offset-xxl-3 col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
              <div className="sign__wrapper white-bg">
                <div className="flex flex-wrap justify-center items-center gap-6 py-24">
                  <div className="w-[40px] h-[40px] border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <h3>Checking Login...</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* sign up area end */}
    </main>
  );
};

export default Page;
