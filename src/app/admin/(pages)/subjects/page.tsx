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


    // Logout function to invalidate the session/token
    const logout = async () => {

        setLoading(true); // Show loader

        try {
            const baseUrl = window.location.origin;
            const Path = process.env.NEXT_PUBLIC_ADMIN_LOGOUT; // Make sure to set the logout endpoint in the environment variable
            const Url = `${baseUrl}${Path}`;

            await axios.post(Url, {}, { withCredentials: true });

            // Redirect to login page after logout
            router.push("/admin/login");
        } catch (error) {
            console.error("Error logging out:", error);
            // Handle errors if needed
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <section className="dashboard__area pt-200 pb-145">
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-12">
                            <div className="section__title-wrapper text-center mb-55">
                                <h2 className="section__title">All Subject </h2>
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

                    {/* Centered logout button */}
                    <div className="row justify-content-center mt-5">
                        <div className="col-auto">

                            <button className="btn btn-danger" onClick={logout} >
                                {loading ? (
                                    <span>Loading...</span>
                                ) : 'Logout'}
                            </button>


                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AdminDashboard;
