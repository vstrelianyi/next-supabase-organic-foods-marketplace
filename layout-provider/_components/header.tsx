import { Menu as IconMenu, ShoppingCart, } from 'lucide-react';
import Link from 'next/link';
import React, { useState, } from 'react';

import productCartStore, { IProductCartStore, } from '@/store/store-product-cart';

import MenuItems from './menu-items';

import { IUser, } from '@/interfaces';

// import Image from 'next/image';

function Header( { user, } : { user : IUser } ) {
  // console.log( 'Header -> user:', user );
  const [ openMenuItems, setOpenMenuItems, ] = useState( false );

  const { items, } = productCartStore() as IProductCartStore;

  const totalItemsCount = items.reduce( ( acc, item ) => acc + item.quantity, 0 );

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
        <Link
          href="/"
          className="hover:text-accent"
        >Organic Foods Marketplace</Link>
      </h1>

      <div className="text-sm text-white flex items-center">
        { totalItemsCount > 0 && (
          <Link
            href="/user/cart"
            className="mr-4 relative p-3"
          >
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
              { totalItemsCount }
            </span>

            <ShoppingCart
              size={ 24 }
              className="cursor-pointer"
            />
          </Link>
        ) }

        <span className="mr-4">
          { user?.email } | { user?.id }
        </span>

        <button onClick={ () => {setOpenMenuItems( ( prev ) => !prev );} }>
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