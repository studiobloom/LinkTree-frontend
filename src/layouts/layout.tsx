// src/layouts/Layout.tsx

import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="bg-purple-700 min-h-screen flex items-center justify-center p-4 md:p-8">
      {children}
    </div>
  );
};

export default Layout;
