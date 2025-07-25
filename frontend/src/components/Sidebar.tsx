import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, children }) => {
  return (
    <>
      {/* Mobile Overlay Sidebar */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-200 ${isOpen ? 'block sm:hidden' : 'hidden'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-card/95 backdrop-blur-md border-r border-border/50 z-50 transform transition-transform duration-200 flex flex-col block sm:hidden
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{ maxWidth: 320 }}
        aria-label="Sidebar"
      >
        {/* Close button for mobile */}
        <div className="flex justify-end p-2">
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-accent/10 focus:outline-none transition-all duration-200"
            aria-label="Close sidebar"
          >
            <span className="text-2xl text-muted-foreground hover:text-foreground">×</span>
          </button>
        </div>
        <div className="p-4 flex-1 overflow-y-auto h-full">
          {children}
        </div>
      </aside>
      {/* Desktop Sidebar */}
      <aside
        className="hidden sm:flex flex-col h-full w-72 bg-card/80 backdrop-blur-md border-r border-border/50"
        style={{ maxWidth: 320 }}
        aria-label="Sidebar"
      >
        <div className="p-4 flex-1 overflow-y-auto">
          {children}
        </div>
      </aside>
    </>
  );
}; 