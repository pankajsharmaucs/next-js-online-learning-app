"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkAdminLogin } from "@/utlis/checkAdminLogin";
import Card1 from "@/components/admin/card/Card1";


const AdminDashboard = () => {
    const [loading, setLoading] = useState(false); // State to track loading status
    const router = useRouter();

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
                                <h2 className="section__title">Welcome to Admin Dashboard</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2 ">
                        <Card1 title={"User"}  link={"/admin/users"} icon={'FaUser'}  />
                        <Card1 title={"Add"}  link={"/admin/add"} icon={'FaPlus'}  />
                        <Card1 title={"Classes"}  link={"/admin/classes"} icon={'FaChalkboardTeacher'}  />
                        <Card1 title={"Subjects"}  link={"/admin/subjects"} icon={'FaBookOpen'}  />
                        <Card1 title={"Settings"}  link={"/admin/settings"} icon={'FaCog'}  />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AdminDashboard;
