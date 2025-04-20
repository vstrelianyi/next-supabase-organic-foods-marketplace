import dayjs from 'dayjs';
import { useState, } from 'react';
import toast from 'react-hot-toast';

import { cancelOrderById, markOrderAsDeliveredById, } from '@/actions/orders';
import { Button, } from '@/components/ui/button';
import { DialogHeader, Dialog, DialogContent, DialogTitle, } from '@/components/ui/dialog';
import { IUsersStore, } from '@/store/store-users';
import usersStore from '@/store/store-users';

import { IOrderItem, } from '@/interfaces';

interface IOrderDetailsProps {
  selectedOrder : IOrderItem;
  setSelectedOrder : ( order : IOrderItem | null ) => void;
  reloadData : () => void;
}

function OrderDetails( { selectedOrder, setSelectedOrder, reloadData, } : IOrderDetailsProps ) {
  const [ loading, setLoading, ] = useState( false );
  const { user, } = usersStore() as IUsersStore;
  const renderOrderProperty = ( key : string, value : any ) => {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-xs text-gray-500 font-semibold">{ key }</p>
        <p className="text-sm">{ value }</p>
      </div>
    );
  };

  const cancelOrderHandler = async() => {
    try {
      setLoading( true );
      const response : any = await cancelOrderById( selectedOrder.id, selectedOrder.payment_id );
      if ( response.success ) {
        setSelectedOrder( null );
        toast.success( response.message );
        reloadData?.();
      } else {
        toast.error( response.message );
      }
    } catch ( error : any ) {
      toast.error( error.message );
    } finally {
      setLoading( false );
    }
  };

  const markAsDeliveredHandler = async() => {
    try {
      setLoading( true );
      const response : any = await markOrderAsDeliveredById( selectedOrder.id );
      if ( response.success ) {
        toast.success( response.message );
        reloadData?.();
        setSelectedOrder( null );
      } else {
        toast.error( response.message );
      }
    } catch ( error : any ) {
      toast.error( error.message );
    } finally {
      setLoading( false );
    }
  };

  return (
    <Dialog
      open={ !!selectedOrder }
      onOpenChange={ () => setSelectedOrder( null ) }
    >
      <DialogContent>
        <DialogHeader><DialogTitle>Order Details</DialogTitle></DialogHeader>
        <hr className="my-4 border-gray-400"></hr>
        <div className="flex flex-col gap-4">
          { renderOrderProperty( 'Order ID', selectedOrder.id ) }
          { renderOrderProperty( 'Order Date', dayjs( selectedOrder.created_at ).format( 'DD/MM/YYYY HH:mm' ) ) }
          { renderOrderProperty( 'Order Status', selectedOrder.addresses.phone_number ) }
          { renderOrderProperty( 'Order Status', selectedOrder.addresses.postal_code ) }
          { renderOrderProperty( 'Order Status', selectedOrder.addresses.country ) }
          { renderOrderProperty( 'Order Status', selectedOrder.addresses.city ) }
          { renderOrderProperty( 'Order Status', selectedOrder.addresses.address ) }
        </div>
        <hr className="my-4 border-gray-400"></hr>
        <div className="flex justify-end gap-4">
          { selectedOrder.order_status === 'order_placed' && (
            <div className="flex gap-5">
              <Button
                disabled={ loading }
                variant="outline"
                onClick={ cancelOrderHandler }
              >Cancel order</Button>
              { user.is_admin && (
                <Button
                  disabled={ loading }
                  variant="outline"
                  onClick={ markAsDeliveredHandler }
                >Mark as delivered</Button>
              ) }
            </div>

          ) }
          <Button
            variant="default"
            disabled={ loading }
            onClick={ () => setSelectedOrder( null ) }
          >Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default OrderDetails;