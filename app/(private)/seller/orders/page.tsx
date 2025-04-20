'use client';

import dayjs from 'dayjs';
import { useEffect, useState, } from 'react';
import toast from 'react-hot-toast';

import { getOrderItemsBySellerId, } from '@/actions/orders';
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
import { IUsersStore, } from '@/store/store-users';
import usersStore from '@/store/store-users';

import { IOrder, IOrderItem, IProduct, } from '@/interfaces';

function PageSellerOrders() {
  const [ items, setItems, ] = useState<IOrder[]>( [] );
  const { user, } = usersStore() as IUsersStore;
  const [ loading, setLoading, ] = useState( false );

  const columns = [
    'Order ID',
    'Item',
    'Quantity',
    'Unit Price',
    'Total',
    'Ordered At',
  ];

  useEffect( () => {
    const fetchData = async () => {
      try {
        setLoading( true );
        const response : any = await getOrderItemsBySellerId( user.id );
        if ( response.error ) {
          throw new Error( response.error.message );
        }

        setItems( response.data );
      } catch ( error : any ) {
        toast.error( error.message );
      } finally {
        setLoading( false );
      }
    };
    fetchData();
  }, [ user.id, ] );

  return (
    <div>
      <TitlePage
        title="Orders"
        className="mb-4"
      />

      { ( !loading && items.length > 0 ) && (
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
            { items.map( ( item : IOrder ) => (
              <TableRow key={ item.id }>
                <TableCell className="font-medium">{ item.order_id }</TableCell>
                <TableCell className="font-medium">{ item.name }</TableCell>
                <TableCell className="font-medium">{ item.quantity }</TableCell>
                <TableCell className="font-medium">{ item.price } $</TableCell>
                <TableCell className="font-medium">{ item.total } $</TableCell>
                <TableCell className="font-medium">{ dayjs( item.created_at ).format( 'DD MMM YYYY HH:mm' ) }</TableCell>
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

export default PageSellerOrders;