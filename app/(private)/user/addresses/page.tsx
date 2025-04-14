'use client';

import { useEffect, useState, } from 'react';

import { getAddressesByUserId, } from '@/actions/addresses';
import { Button, } from '@/components/ui/button';
import Spinner from '@/components/ui/spinner';
import TitlePage from '@/components/ui/title-page';
import { IUsersStore, } from '@/store/store-users';
import usersStore from '@/store/store-users';

import FormAddresses from './_components/form-addresses';

import { IAddress, } from '@/interfaces';

export default function PageUserAddresses() {
  const [ openAddressForm, setOpenAddressForm, ] = useState( false );
  const [ addresses, setAddresses, ] = useState( [] );
  const { user, } = usersStore() as IUsersStore;
  const [ loading, setLoading, ] = useState( false );

  const fetchData = async() => {
    try {
      setLoading( true );
      const response : any = await getAddressesByUserId( user.id );
      if ( response.success ) {
        setAddresses( response.data );
      } else {
        throw new Error( response.message );
      }
      setLoading( false );
    } catch ( error ) {
      setLoading( false );
    }
  };

  useEffect( () => {
    fetchData();
  }, [] );

  const renderAddressProperty = ( label : string, value : string | number ) => {
    return (
      <div className="flex flex-col gap-2">
        <span className="text-xs text-gray-500 font-semibold">{ label }</span>
        <span className="text-sm font-semibold">{ value }</span>
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <TitlePage title="Addresses" />
        <Button onClick={ () => setOpenAddressForm( true ) }>Add New Address</Button>
      </div>

      { loading && <Spinner /> }
      { !loading && addresses.length === 0 && (
        <span>No addresses</span>
      ) }
      { !loading && addresses.length > 0 && (
        <div className="flex flex-col gap-4">
          { addresses.map( ( address : IAddress ) => (
            <div
              key={ address.name }
              className="p-5 border border-gray-300 rounded grid lg:grid-cols-3 gap-4"
            >
              { renderAddressProperty( 'Name', address.name ) }
              { renderAddressProperty( 'Email', address.email ) }
              { renderAddressProperty( 'Phone Number', address.phone_number ) }
              { renderAddressProperty( 'Country', address.country ) }
              { renderAddressProperty( 'City', address.city ) }
              { renderAddressProperty( 'Postal Code', address.postal_code ) }
              <div className="col-span-3">
                { renderAddressProperty( 'Address', address.address ) }
              </div>
              <div className="col-span-3 flex gap-2 justify-end">
                <Button variant="outline">Edit</Button>
                <Button variant="destructive">Delete</Button>
              </div>
            </div>
          ) ) }
        </div>
      ) }

      { openAddressForm && (
        <FormAddresses
          formType={ 'add' }
          openAddressForm={ openAddressForm }
          setOpenAddressForm={ setOpenAddressForm }
        />
      ) }
    </div>
  );
}
