import Image from 'next/image';
import { getCurrentUserFromSupabase, } from '@/actions/users';
import { UserButton, } from '@clerk/nextjs';
import { currentUser, } from '@clerk/nextjs/server';
import { redirect, } from 'next/navigation';

export default async function PageUserShop() {
  const user = await currentUser();
  if ( !user ) {
    redirect( '/?formType=sign-in' );
  }
  // console.log( 'user', user );

  const userId = user?.id;
  const userEmail = user?.emailAddresses[ 0 ]?.emailAddress;
  const userName = `${ user?.firstName ?? ''} ${user?.lastName ?? ''}`;

  const supabaseUserResponse = await getCurrentUserFromSupabase();
  // console.log( 'PageUserShop -> supabaseUserResponse:', supabaseUserResponse );
  return (
    <div>
      <h1>
        User Shop
      </h1>
      <UserButton />

      <div className="flex flex-col gap-2">
        <h2>
          Clerk User ID:
          { userId }
        </h2>
        <h2>
          Clerk User Email:
          { userEmail }
        </h2>
        <h2>
          User name
          { userName }
        </h2>
        { /* <h2>
          Profile picture:
          <Image
            className="rounded-full"
            src={ user.imageUrl }
            alt="user image"
            width={ 100 }
            height={ 100 }
          />
        </h2> */ }
      </div>
    </div>
  );
}