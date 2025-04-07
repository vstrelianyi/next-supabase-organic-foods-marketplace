'use client';

import { usePathname, } from 'next/navigation';
import React from 'react';

// COMPONENTS
import LayoutPrivate from './layout-private';
import LayoutPublic from './layout-public';

function LayoutCustom( { children, }: { children: React.ReactNode } ) {
  const pathname = usePathname();
  const isPrivate = pathname.startsWith( '/user' ) || pathname.startsWith( '/admin' ) || pathname.startsWith( '/seller' );

  if( isPrivate ){
    return (
      <LayoutPrivate>
        { children }
      </LayoutPrivate>
    );
  }
  return (
    <LayoutPublic>
      { children }
    </LayoutPublic>
  );
}

export default LayoutCustom;