import React from 'react';
import UserSidebar from './UserSidebar';

const UserLayout = ({ children, pageTitle }) => {
  return (
    <div className="flex bg-white min-h-screen">
      <UserSidebar />
      <div className="flex-1 p-6">
      <div className="bg-green-800 text-white text-center py-4 rounded-b-[60px] text-2xl font-bold shadow-md">          {pageTitle}
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
};

export default UserLayout;