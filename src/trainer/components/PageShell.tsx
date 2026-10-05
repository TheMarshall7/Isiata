import React from 'react';
import { TrainerAmbientBackground } from './TrainerAmbientBackground';

interface PageShellProps {
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
  ambientOrbs?: boolean;
}

export const PageShell: React.FC<PageShellProps> = ({
  children,
  className = '',
  centered = false,
  ambientOrbs = true,
}) => {
  return (
    <div
      className={`min-h-screen bg-background text-white relative flex flex-col ${centered ? 'items-center justify-center' : ''} ${className}`}
    >
      <TrainerAmbientBackground orbs={ambientOrbs} />
      {children}
    </div>
  );
};
