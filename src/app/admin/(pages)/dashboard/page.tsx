"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkAdminLogin } from "@/utlis/checkAdminLogin";
import { FaRegUser } from "react-icons/fa"; // or any icon from react-icons

const AdminDashboard = () => {
    const [loading, setLoading] = useState(false); // State to track loading status
    const router = useRouter();

    useEffect(() => {
        checkAdminLogin(router);
    }, [router]);

    return (
        <main>
            <section className="dashboard__area pt-200 pb-145">
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-12">
                            <div className="section__title-wrapper text-center mb-55">
                                <h2 className="section__title">Welcome to Admin Dashboard</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-2 ">
                            <div className="flex flex-col items-center justify-center bg-white border
                                     border-gray-200 rounded-2xl shadow-md hover:shadow-xl hover:border-gray-400 transition-all duration-300 text-center"
                            >
                                <FaRegUser className="text-4xl text-gray-600 mb-2  " 
                                style={{padding:"10px 5px"}} />
                                <h3 className="text-lg font-medium">User</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AdminDashboard;
