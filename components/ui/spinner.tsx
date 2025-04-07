import clsx from 'clsx';
import React from 'react';
import { motion, } from 'framer-motion';

interface ISpinnerProps{
  height?: number;
}

function Spinner( { height, }: ISpinnerProps ) {
  return (
    <div
      className={ clsx(
        'flex items-center justify-center',
        height ? `h-${height}px` : 'h-[100vh]'
      ) }
    >
      <motion.div
        style={ {
          width: '50px',
          height: '50px', // aspect-ratio: 1 can be replaced with equal width/height
          borderRadius: '50%',
          background: 'hsl(139 98% 45%)',
          mask: 'radial-gradient(circle closest-side at 50% 40%, transparent 94%, black)',
          WebkitMask: 'radial-gradient(circle closest-side at 50% 40%, transparent 94%, black)',
          transformOrigin: '50% 40%',
        } }
        animate={ { rotate: 360, } }
        transition={ {
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        } }
      />
    </div>
  );
}

export default Spinner;