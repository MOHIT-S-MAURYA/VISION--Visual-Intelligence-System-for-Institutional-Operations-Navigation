import React from 'react';
import { Outlet } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <Outlet />
    </div>
  );
}

export default Dashboard;
