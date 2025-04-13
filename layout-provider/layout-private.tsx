import { useEffect, useState, } from 'react';
import toast from 'react-hot-toast';

import { getCurrentUserFromSupabase, } from '@/actions/users';
import Spinner from '@/components/ui/spinner';
import usersStore, { IUsersStore, } from '@/store/store-users';

import Header from './_components/header';

const LayoutPrivate = ( { children, } : { children : React.ReactNode } ) => {
  const { user, setUser, } = usersStore() as IUsersStore;
  const [ loading, setLoading, ] = useState( false );

  useEffect( () => {
    const fetchUser = async() => {
      try {
        setLoading( true );
        const response = await getCurrentUserFromSupabase();
        // console.log( response );
        if ( !response.success ) {
          toast.error( 'Error while fetching user' );
        } else {
          setUser( response.data?.[0] );
        }
      } catch ( error ) {
        toast.error( 'Error while fetching user' );
      } finally {
        setLoading( false );
      }
    };
    if ( !user ) {
      fetchUser();
    }
  }, [ user, setUser, ] );

  if ( loading ) {
    return (
      <Spinner/>
    );
  }

  return (
    <div>
      <Header user={ user! }/>
      <div className="p-5">
        { children }
      </div>
    </div>
  );
};

export default LayoutPrivate;
