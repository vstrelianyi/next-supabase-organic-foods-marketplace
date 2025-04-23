'use client';

import dayjs from 'dayjs';
import { PlusIcon, TrashIcon, } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState, } from 'react';
import toast from 'react-hot-toast';

import { addSellerRole, getAllUsers, removeSellerRole, } from '@/actions/users';
import { Button, } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input, } from '@/components/ui/input';
import Spinner from '@/components/ui/spinner';
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
const PageSellers = () => {
  const [ loading, setLoading, ] = useState<boolean>( false );
  const [ sellers, setSellers, ] = useState<IUser[]>( [] );
  const [ openDialog, setOpenDialog, ] = useState<boolean>( false );
  const [ email, setEmail, ] = useState<string>( '' );
  const [ loadingDialog, setLoadingDialog, ] = useState<boolean>( false );

  const fetchSellers = async() => {
    try {
      setLoading( true );
      const response = await getAllUsers( { roleType: 'seller', } );
      setSellers( response.data || [] );
    } catch ( error ) {
      console.error( error );
    } finally {
      setLoading( false );
    }
  };

  const handleAddSeller = async() => {
    try {
      setLoadingDialog( true );
      const response = await addSellerRole( email );

      if ( response.success ) {
        toast.success( 'Seller added successfully' );
        setOpenDialog( false );
        setEmail( '' );
        await fetchSellers();
      } else {
        toast.error( response.message );
      }
    } catch ( error ) {
      console.error( error );
      toast.error( 'Error adding seller' );
    } finally {
      setLoadingDialog( false );
    }
  };

  const handleRemoveSellerRole = async( sellerId : string ) => {
    try {
      setLoading( true );
      const response : any = await removeSellerRole( sellerId );

      if ( response.success ) {
        toast.success( 'Seller role removed successfully' );
        await fetchSellers();
      } else {
        toast.error( response.message );
      }
    } catch ( error ) {
      console.error( error );
      toast.error( 'Error removing seller role' );
    } finally {
      setLoading( false );
    }
  };

  useEffect( () => {
    fetchSellers();
  }, [] );

  const columns = [
    'Seller ID',
    'Name',
    'Email',
    'Profile Pic',
    'Created At',
    'Actions',
  ];

  return (
    <div>
      <div className="flex gap-4 mb-4 items-center justify-between">
        <TitlePage
          title="Sellers"
          className=""
        />
        <Button onClick={ () => setOpenDialog( true ) }>
          <PlusIcon className="w-4 h-4" />
          Add Seller
        </Button>
      </div>

      { ( !loading && sellers.length > 0 ) && (
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
            { sellers.map( ( seller : IUser ) => (
              <TableRow key={ seller.id }>
                <TableCell className="font-medium">{ seller.id }</TableCell>
                <TableCell className="font-medium">{ seller.name }</TableCell>
                <TableCell className="font-medium">{ seller.email }</TableCell>
                <TableCell className="font-medium">
                  <Image
                    src={ seller.profile_pic }
                    alt={ seller.name }
                    width={ 50 }
                    height={ 50 }
                  />
                </TableCell>
                <TableCell className="font-medium">{ dayjs( seller.created_at ).format( 'DD MMM YYYY HH:mm' ) }</TableCell>
                <TableCell className="font-medium">
                  <Button
                    variant="outline"
                    onClick={ () => handleRemoveSellerRole( seller.id ) }
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </TableCell>

              </TableRow>
            ) ) }
          </TableBody>
        </Table>
      ) }

      { loading && (
        <Spinner height={ 150 }/>
      ) }

      { openDialog && (
        <Dialog
          open={ openDialog }
          onOpenChange={ setOpenDialog }
        >
          <DialogContent className="">
            <DialogHeader>
              <DialogTitle>Add Seller</DialogTitle>
              <DialogDescription>
                Add email address of the seller to add them to the platform.
              </DialogDescription>
            </DialogHeader>

            <Input
              value={ email }
              onChange={ ( e ) => setEmail( e.target.value ) }
              placeholder="Enter email address"
            />

            <div className="flex justify-between mt-4">
              <Button
                variant="outline"
                onClick={ () => setOpenDialog( false ) }
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-[300px]"
                disabled={ loadingDialog }
                onClick={ handleAddSeller }
              >
                Submit
              </Button>
            </div>

          </DialogContent>
        </Dialog>
      ) }
    </div>
  );
};

export default PageSellers;