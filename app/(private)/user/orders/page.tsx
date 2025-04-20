
'use client';

import dayjs from 'dayjs';
import Image from 'next/image';
import { useState, useEffect, useCallback, } from 'react';
import toast from 'react-hot-toast';

import { getOrdersByUserId, } from '@/actions/orders';
import { Button, } from '@/components/ui/button';
import Spinner from '@/components/ui/spinner';
import TitlePage from '@/components/ui/title-page';
import { IUsersStore, } from '@/store/store-users';
import usersStore from '@/store/store-users';

import OrderDetails from './_components/order-details';

import { IOrderItem, } from '@/interfaces';

function PageUserOrders() {
  const [ loading, setLoading, ] = useState( false );
  const [ orders, setOrders, ] = useState<IOrderItem[]>( [] );
  const { user, } = usersStore() as IUsersStore;
  const [ selectedOrder, setSelectedOrder, ] = useState<IOrderItem | null>( null );

  const fetchOrders = useCallback( async () => {
    if ( !user.id ) return;
    try {
      setLoading( true );
      const response : any = await getOrdersByUserId( user.id );
      if ( response.success ) {
        // console.log( response.data );
        setOrders( response.data );
      } else {
        toast.error( 'getOrdersByUserId: ' + response.message );
      }
    } catch ( error : any ) {
      toast.error( error.message );
    } finally {
      setLoading( false );
    }
  },
  [ user.id, ]
  );

  useEffect( () => {
    fetchOrders();
  }, [ fetchOrders, ] );

  const renderOrderProperty = ( key : string, value : any ) => {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-xs text-gray-500 font-semibold">{ key }</p>
        <p className="text-sm">{ value }</p>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <TitlePage
        title="Orders"
      />
      { loading && (
        <Spinner />
      ) }
      { !loading && !orders.length && (
        <div>No orders found</div>
      ) }

      <div className="flex flex-col gap-7">
        { orders.map( ( order : IOrderItem ) => (
          <div
            key={ order.id }
            className="flex flex-col gap-4 rounded border border-gray-200 p-5"
          >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              { renderOrderProperty( 'Order ID', order.id ) }
              { renderOrderProperty( 'Order Date and Time', dayjs( order.created_at ).format( 'DD/MM/YYYY HH:mm' ) ) }
              { renderOrderProperty( 'Order Total', order.total ) }
              { renderOrderProperty( 'Order Status', order.order_status ) }
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-sm font-semibold">Order Items</p>
              <div className="flex flex-col gap-2">
                { order.order_items.map( ( item : any ) => (
                  <div
                    className="flex gap-2 border border-gray-200 rounded-[10px] overflow-hidden"
                    key={ item.id }
                  >
                    <div className="wrapper-image relative h-[50px] w-[50px]">
                      <Image
                        src={ item.image }
                        fill
                        alt={ item.name }
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-sm font-semibold">{ item.name }</span>:<span className="text-gray-400 text-xs"><span className="">{ item.price }$</span> X <span className=""> </span><span className="">{ item.quantity }</span></span>
                      </div>
                      <span className="text-sm text-green-500 font-semibold">Total: { item.total }$</span>
                    </div>

                  </div>
                ) ) }
              </div>
            </div>

            <div className="flex flex-col self-end gap-2">
              <Button
                className="text-sm font-semibold"
                onClick={ () => setSelectedOrder( order ) }
              >View Details</Button>
            </div>

            { selectedOrder && (
              <OrderDetails
                selectedOrder={ selectedOrder }
                setSelectedOrder={ setSelectedOrder }
                reloadData={ fetchOrders }
              />
            ) }

          </div>
        ) ) }
      </div>
    </div>
  );
}

export default PageUserOrders;
