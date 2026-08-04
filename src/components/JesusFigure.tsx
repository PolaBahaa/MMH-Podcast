import React from 'react';
import { JesusPosition } from '../types';

interface JesusFigureProps {
  position: JesusPosition;
  isTransitioning: boolean;
  direction?: 'next' | 'prev';
}

export const JesusFigure: React.FC<JesusFigureProps> = () => {
  // Cut-out Jesus figure overlay is removed as cinematic videos contain Jesus directly in each scene
  return null;
};

