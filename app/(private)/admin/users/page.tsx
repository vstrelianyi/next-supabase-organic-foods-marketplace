'use client';

import dayjs from 'dayjs';
import Image from 'next/image';
import { useEffect, useState, } from 'react';
import toast from 'react-hot-toast';

import { getAllUsers, updateUserStatus, } from '@/actions/users';
import Spinner from '@/components/ui/spinner';
import { Switch, } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import TitlePage from '@/components/ui/title-page';
import { cn, } from '@/lib/utils';

import { IUser, } from '@/interfaces';
const PageUsers = () => {
  const [ loading, setLoading, ] = useState<boolean>( false );
  const [ users, setUsers, ] = useState<IUser[]>( [] );

  const fetchUsers = async() => {
    try {
      setLoading( true );
      const response = await getAllUsers( { roleType: 'user', } );
      setUsers( response.data || [] );
    } catch ( error ) {
      console.error( error );
    } finally {
      setLoading( false );
    }
  };

  const handleToggleUserStatus = async( userId : string, status : boolean ) => {
    try {
      setLoading( true );
      const response = await updateUserStatus( userId, status );
      console.log( response );

      if ( response.success ) {
        toast.success( 'User status updated successfully' );
      } else {
        toast.error( response.message );
      }

      await fetchUsers();
    } catch ( error ) {
      console.error( error );
    } finally {
      setLoading( false );
    }
  };

  useEffect( () => {
    fetchUsers();
  }, [] );

  const columns = [
    'User ID',
    'Clerk ID',
    'Name',
    'Email',
    'Profile Pic',
    'Is Admin',
    'Is Seller',
    'Is Active',
    'Created At',
  ];

  return (
    <div>
      <TitlePage
        title="Users"
        className="mb-4"
      />

      { ( !loading && users.length > 0 ) && (
        <Table className={ cn( loading && 'opacity-30 pointer-events-none' ) }>
          <TableHeader className="bg-gray-300">
            <TableRow>
              { columns.map( ( column ) => (
                <TableHead
                  key={ column }
                  className="font-bold"
                >{ column }</TableHead>
              ) ) }
            </TableRow>
          </TableHeader>
          <TableBody>
            { users.map( ( users : IUser ) => (
              <TableRow key={ users.id }>
                <TableCell className="font-medium">{ users.id }</TableCell>
                <TableCell className="font-medium">{ users.clerk_user_id }</TableCell>
                <TableCell className="font-medium">{ users.name }</TableCell>
                <TableCell className="font-medium">{ users.email }</TableCell>
                <TableCell className="font-medium">
                  <Image
                    src={ users.profile_pic }
                    alt={ users.name }
                    width={ 50 }
                    height={ 50 }
                  />
                </TableCell>
                <TableCell className="font-medium">{ users.is_admin ? 'Yes' : 'No' }</TableCell>
                <TableCell className="font-medium">{ users.is_seller ? 'Yes' : 'No' }</TableCell>
                <TableCell className="font-medium">
                  <Switch
                    checked={ users.is_active }
                    onCheckedChange={ ( checked ) => {
                      handleToggleUserStatus( users.id, checked );
                    } }
                  />
                </TableCell>
                <TableCell className="font-medium">{ dayjs( users.created_at ).format( 'DD MMM YYYY HH:mm' ) }</TableCell>
              </TableRow>
            ) ) }
          </TableBody>
        </Table>
      ) }

      { loading && (
        <Spinner height={ 150 }/>
      ) }
    </div>
  );
};

export default PageUsers;