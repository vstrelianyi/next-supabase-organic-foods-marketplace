'use client';

import dayjs from 'dayjs';
import { Trash, Pencil, } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, } from 'react';
import toast from 'react-hot-toast';

import { deleteProductById, getProductsBySellerId, } from '@/actions/products';
import { Button, } from '@/components/ui/button';
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
import { IProduct, } from '@/interfaces';
import usersStore, { IUsersStore, } from '@/store/store-users';

function PageSellerProducts() {
  const { user, } = usersStore() as IUsersStore;
  const [ products, setProducts, ] = useState( [] );
  const [ loading, setLoading, ] = useState<boolean>( false );

  const fetchData = async( userId : string ) => {
    try {
      setLoading( true );
      const response : any = await getProductsBySellerId( userId );
      if ( response.success ) {
        setProducts( response.data );
        console.log( response.data );
      } else {
        toast.error( response.message );
      }
    } catch ( error ) {
      toast.error( 'Failed to fetch products' );
    } finally {
      setLoading( false );
    }
  };

  const deleteProductHandler = async( productId : string ) => {
    try {
      setLoading( true );
      const response : any = await deleteProductById( productId );
      if ( response.success ) {
        toast.success( response.message );
        fetchData( user.id );
      } else {
        toast.error( response.message );
      }
    } catch ( error ) {
      toast.error( 'Failed to delete product' );
    } finally {
      setLoading( false );
    }
  };

  useEffect( () => {
    if ( user?.id ) fetchData( user.id );
  }, [ user.id, ] );

  const invoices = [
    {
      invoice: 'INV001',
      paymentStatus: 'Paid',
      totalAmount: '$250.00',
      paymentMethod: 'Credit Card',
    },
    {
      invoice: 'INV002',
      paymentStatus: 'Pending',
      totalAmount: '$150.00',
      paymentMethod: 'PayPal',
    },
    {
      invoice: 'INV003',
      paymentStatus: 'Unpaid',
      totalAmount: '$350.00',
      paymentMethod: 'Bank Transfer',
    },
    {
      invoice: 'INV004',
      paymentStatus: 'Paid',
      totalAmount: '$450.00',
      paymentMethod: 'Credit Card',
    },
    {
      invoice: 'INV005',
      paymentStatus: 'Paid',
      totalAmount: '$550.00',
      paymentMethod: 'PayPal',
    },
    {
      invoice: 'INV006',
      paymentStatus: 'Pending',
      totalAmount: '$200.00',
      paymentMethod: 'Bank Transfer',
    },
    {
      invoice: 'INV007',
      paymentStatus: 'Unpaid',
      totalAmount: '$300.00',
      paymentMethod: 'Credit Card',
    },
  ];

  const columns = [
    'Name',
    'Category',
    'Price',
    'Stock',
    'Created At',
    'Actions',
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <TitlePage title="My Products"></TitlePage>
        <Button asChild>
          <Link href="/seller/products/add">
            Add Product
          </Link>
        </Button>
      </div>

      { ( !loading && products.length > 0 ) && (
        <Table>
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
            { products.map( ( product : IProduct ) => (
              <TableRow key={ product.id }>
                <TableCell className="font-medium">{ product.name }</TableCell>
                <TableCell>{ product.category }</TableCell>
                <TableCell>{ product.price }</TableCell>
                <TableCell>{ product.stock }</TableCell>
                <TableCell>{ dayjs( product.created_at ).format( 'DD MMM YYYY HH:mm' ) }</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      asChild
                      variant="secondary"
                    >
                      <Link href={ `/seller/products/edit/${ product.id }` }>
                        <Pencil
                          color="black"
                          size={ 16 }
                        />
                      </Link>
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={ () => deleteProductHandler( product.id ) }
                    >
                      <Trash
                        color="red"
                        size={ 16 }
                      />
                    </Button>
                  </div>
                </TableCell>
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
}

export default PageSellerProducts;