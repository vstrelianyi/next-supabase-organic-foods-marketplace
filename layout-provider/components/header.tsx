import { IUser, } from '@/interfaces';
import { Menu as IconMenu, } from 'lucide-react';
import React, { useState, } from 'react';
import MenuItems from './menu-items';
import Link from 'next/link';
// import Image from 'next/image';

function Header( { user, } : { user: IUser } ) {
  // console.log( 'Header -> user:', user );
  const [ openMenuItems, setOpenMenuItems, ] = useState( false );
  return (
    <div className="bg-primary p-5 flex justify-between items-center">
      { /* <Image
          src="https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ydjVNS1czUWVzVVdYZHpZMkF4Sjh3MndnMEQiLCJyaWQiOiJ1c2VyXzJ2NXRpYVBQMzZnT0tXak9zdWtRejh5YXp5YyIsImluaXRpYWxzIjoiVFQifQ"
          alt="image"
          width="50"
          height="50"
          className="rounded-full"
        /> */ }
      <h1 className="text-2xl font-bold text-ring">
			<Link href="/" className="hover:text-accent">Organic Foods Marketplace</Link>
      </h1>

      <div className="text-sm text-white flex items-center">
        <span className="mr-4">
          { user?.email }
        </span>
        <button onClick={ () => {setOpenMenuItems( prev => !prev );} }>
          <IconMenu
            size={ 35 }
            className="cursor-pointer"
          />
        </button>

        { openMenuItems && (
          <MenuItems
            openMenuItems={ openMenuItems }
            setOpenMenuItems={ setOpenMenuItems }
          />
        ) }
      </div>
    </div>
  );
}

export default Header;