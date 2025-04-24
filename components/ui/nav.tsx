
import {
  SignIn,
  SignUp,
} from '@clerk/nextjs';
import Link from 'next/link';
import { useSearchParams, } from 'next/navigation';
import { useState, } from 'react';

import { Button, } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

const Nav = () => {
  const menuItems = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'About',
      path: '/about',
    },
    {
      name: 'Contact',
      path: '/contact',
    },

  ];

  const [ openSignInForm, setOpenSignInForm, ] = useState ( false );
  const searchParams = useSearchParams();
  const formType = searchParams.get( 'formType' );

  return (
    <>
      <div className="Nav flex flex-wrap lg:flex-nowrap justify-between items-center">
        <h1 className="text-2xl font-bold text-ring">
          <Link
            href="/"
            className="hover:text-accent"
          >Organic Foods Marketplace</Link>
        </h1>
        <div className="flex items-center gap-4 py-2 grow justify-around lg:justify-end">
          { menuItems.map( ( item ) => (
            <Link
              key={ item.path }
              href={ item.path }
              className="text-sm text-gray-600 font-semibold"
            >
              { item.name }
            </Link>
          ) ) }
          <Button onClick={ () => setOpenSignInForm( true ) }>
            Login
          </Button>
        </div>
      </div>

      <Sheet
        open={ openSignInForm }
        onOpenChange={ setOpenSignInForm }
      >
        <SheetContent className="min-w-[600px] bg-white items-center justify-center">
          <SheetHeader>
            <SheetTitle>
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-center justify-center">
            { formType === 'signUp' ? (
              <SignUp
                routing="hash"
                signInUrl="/?formType=signIn"
              />
            ) : (
              <SignIn
                routing="hash"
                signUpUrl="/?formType=signUp"
              />
            ) }
          </div>
        </SheetContent>
      </Sheet>
    </>

  );
};

export default Nav;