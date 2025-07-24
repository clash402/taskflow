import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, children }) => {
  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-200 ${isOpen ? 'block sm:hidden' : 'hidden'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Sidebar */}
      <aside
        className={`fixed sm:static top-0 left-0 h-full w-72 bg-white border-r border-gray-200 z-50 transform transition-transform duration-200
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          sm:translate-x-0 sm:block
        `}
        style={{ maxWidth: 320 }}
        aria-label="Sidebar"
      >
        {/* Close button for mobile */}
        <div className="flex sm:hidden justify-end p-2">
          <button
            onClick={onClose}
            className="p-2 rounded hover:bg-gray-100 focus:outline-none"
            aria-label="Close sidebar"
          >
            <span className="text-2xl">×</span>
          </button>
        </div>
        <div className="p-4 h-full overflow-y-auto">
          {children}
        </div>
      </aside>
    </>
  );
}; 