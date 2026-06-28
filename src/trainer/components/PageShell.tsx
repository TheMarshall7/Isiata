import React from 'react';

interface PageShellProps {
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
}

export const PageShell: React.FC<PageShellProps> = ({
  children,
  className = '',
  centered = false,
}) => {
  return (
    <div
      className={`min-h-screen bg-background text-white relative flex flex-col ${centered ? 'items-center justify-center' : ''} ${className}`}
    >
      <div className="isiata-ambient-orb -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] top-1/4 left-1/4 opacity-70" />
      <div className="isiata-ambient-orb translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bottom-1/4 right-1/4 opacity-50" />
      {children}
    </div>
  );
};
