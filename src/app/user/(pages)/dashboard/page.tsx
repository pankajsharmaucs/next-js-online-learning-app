"use client";

import React from "react";
import Card1 from "@/components/admin/card/Card1";


const AdminDashboard = () => {


    return (
        <>
            <div className="container">
                <div className="mb-30">
                    <h1 className="text-5xl font-bold">Welcome to User Dashboard</h1>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    <Card1 title="Classes" link="/user/classes" icon="FaUser" />
                    <Card1 title="Subjects" link="/user/subjects" icon="FaPlus" />
                    <Card1 title="Settings" link="/user/settings" icon="FaCog" />
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
