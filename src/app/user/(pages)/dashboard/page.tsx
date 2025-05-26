"use client";

import React  from "react";
import Card1 from "@/components/admin/card/Card1";


const AdminDashboard = () => {

    
    return (
        <>
            <div className="text-center mb-50">
                <h2 className="text-3xl font-bold">Welcome to Admin Dashboard</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <Card1 title="User" link="/admin/users" icon="FaUser" />
                <Card1 title="Add" link="/admin/add" icon="FaPlus" />
                <Card1 title="Settings" link="/admin/settings" icon="FaCog" />
            </div>
        </>
    );
};

export default AdminDashboard;
