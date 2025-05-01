"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { checkAdminLogin } from "@/utlis/checkAdminLogin";

const AdminDashboard = () => {
    const [loading, setLoading] = useState(false); // State to track loading status
    const router = useRouter();

    // Check if the user is logged in (by verifying the token cookie)
    useEffect(() => {
        checkAdminLogin(router);
    }, [router]);

 

    return (
        <main>
            <section className="dashboard__area pt-100 md:pt-[200px] pb-145">
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-12">
                            <div className="section__title-wrapper text-center mb-55">
                                <h2 className="section__title">Add Board/CLass/Subject </h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xxl-12 flex flex-wrap justify-center items-center gap-6 py-24">
                            <div className="dashboard__content ">
                                <p>Here is where the admin dashboard content will be displayed.</p>
                                {/* You can add more components like charts, user data, etc. */}
                            </div>
                        </div>
                    </div>

                     
                </div>
            </section>
        </main>
    );
};

export default AdminDashboard;
