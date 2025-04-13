import { useAuth, } from '@clerk/nextjs';
import clsx from 'clsx';
import { Gem, LayoutDashboardIcon, List, ListCheck, MapIcon, ShoppingBag, ShoppingCart, User2, Circle, } from 'lucide-react';
import Link from 'next/link';
import { usePathname, } from 'next/navigation';
import { useRouter, } from 'next/navigation';
import React, { useMemo, useState, } from 'react';
import toast from 'react-hot-toast';

import { Button, } from '@/components/ui/button';
import { Label, } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem, } from '@/components/ui/radio-group';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

interface IMenuItems{
  openMenuItems : boolean;
  setOpenMenuItems : React.Dispatch<React.SetStateAction<boolean>>;
}

function MenuItems( { openMenuItems, setOpenMenuItems, } : IMenuItems ) {
  const router = useRouter();
  const [ selectedRole, setSelectedRole, ] = useState( 'user' );
  const [ loading, setLoading, ] = useState( false );
  const { signOut, } = useAuth();
  const pathName = usePathname();

  const handleSignOut = async() => {
    try {
      setLoading( true );
      await signOut();
      toast.success( 'Signed out successfully' );
      router.push( '/' );
    } catch ( error ) {
      toast.error( 'Failed to sign out' );
      console.log( error );
    } finally {
      setLoading( false );
    }
  };
  const userRoles = [
    {
      name: 'User',
      value: 'user',
    },
    {
      name: 'Seller',
      value: 'seller',
    },
    {
      name: 'Admin',
      value: 'admin',
    },
  ];
  const iconSize = 20;

  const manuItemsToRender = useMemo( () => {
    const userMenuItems = [
      {
        name: 'Shop',
        route: '/user/shop',
        icon: <ShoppingBag size={ iconSize }/>,
      },
      {
        name: 'Cart',
        route: '/user/cart',
        icon: <ShoppingCart size={ iconSize }/>,
      },
      {
        name: 'Orders',
        route: '/user/orders',
        icon: <List size={ iconSize }/>,
      },
      {
        name: 'Addresses',
        route: '/user/addresses',
        icon: <MapIcon size={ iconSize }/>,
      },
      {
        name: 'Profile',
        route: '/user/profile',
        icon: <User2 size={ iconSize }/>,
      },
    ];
    const sellerMenuItems = [
      {
        name: 'Products',
        route: '/seller/products',
        icon: <ListCheck size={ iconSize }/>,
      },
      {
        name: 'Orders',
        route: '/seller/orders',
        icon: <List size={ iconSize }/>,
      },
    ];
    const adminMenuItems = [
      {
        name: 'Dashboard',
        route: '/admin/dashboard',
        icon: <LayoutDashboardIcon size={ iconSize }/>,
      },
      {
        name: 'Orders',
        route: '/admin/orders',
        icon: <List size={ iconSize }/>,
      },
      {
        name: 'Users',
        route: '/admin/users',
        icon: <User2 size={ iconSize }/>,
      },
      {
        name: 'Sellers',
        route: '/admin/sellers',
        icon: <Gem size={ iconSize }/>,
      },
    ];
    switch ( selectedRole ) {
      case 'user':
        return userMenuItems;
      case 'admin':
        return adminMenuItems;
      case 'seller':
        return	sellerMenuItems;
      default:
        return userMenuItems;
    }
  }, [ selectedRole, ] );
  return (
    <div>
      MenuItems

      <Sheet
        open={ openMenuItems }
        onOpenChange={ ( open ) => {
          if ( !open ) {
            setOpenMenuItems( false );
          }
        } }
      >
        <SheetContent className="min-w-[600px] bg-white flex items-center justify-start gap-0">
          <SheetHeader>
            <SheetTitle className="p-0">
              Menu Items
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-2 items-start justify-center">
            <h3 className="text-gray-500 text-sm">
              Select role
            </h3>
            <RadioGroup
              className="flex gap-6 mb-[20px]"
              defaultValue="user"
              onValueChange={ ( value ) => { setSelectedRole( value ); } }
            >
              { userRoles.map( ( item ) => {
                return (
                  <div
                    className="flex items-center space-x-2"
                    key={ item.value }
                  >
                    <RadioGroupItem
                      value={ item.value }
                      id={ item.value }
                      className="cursor-pointer"
                    />
                    <Label
                      htmlFor={ item.value }
                      className="cursor-pointer"
                    >
                      { item.name }
                    </Label>
                  </div>
                );
              } ) }
            </RadioGroup>

            { manuItemsToRender.map( ( item ) => {
              return (
                <Link
                  key={ item?.route }
                  href={ item?.route }
                  onClick={ () => setOpenMenuItems( false ) }
                  className={ clsx( 'flex items-center', pathName === item?.route && 'text-ring' ) }
                >
                  <span className="mr-2">
                    { item.icon }
                  </span>
                  <span className="text-xl">
                    { item.name }
                  </span>
                </Link>
              );
            } ) }
            <Button
              className="mt-6"
              onClick={ handleSignOut }
              disabled={ loading }
            >
              Sign out
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MenuItems;