import React from 'react';
import { TrainerAmbientBackground } from './TrainerAmbientBackground';

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
      <TrainerAmbientBackground />
      {children}
    </div>
  );
};
