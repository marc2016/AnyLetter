import React from 'react';

interface FileGridProps {
  children: React.ReactNode;
}

export function FileGrid({ children }: FileGridProps) {
  return (
    <div 
      className="grid gap-4 mt-4" 
      style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        justifyContent: 'start'
      }}
    >
      {children}
    </div>
  );
}
