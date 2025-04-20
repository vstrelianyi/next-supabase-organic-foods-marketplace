'use client';

import {
  Elements,
} from '@stripe/react-stripe-js';
import { loadStripe, } from '@stripe/stripe-js';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter, } from 'next/navigation';
import { useEffect, useState, } from 'react';
import toast from 'react-hot-toast';

import { getAddressesByUserId, } from '@/actions/addresses';
import { saveOrderAndOrderItems, } from '@/actions/orders';
import { getStripePaymentIntentToken, } from '@/actions/payments';
import { Button, } from '@/components/ui/button';
import TitlePage from '@/components/ui/title-page';
import productCartStore, { IProductCartStore, } from '@/store/store-product-cart';
import usersStore, { IUsersStore, } from '@/store/store-users';

import FormAddresses from '../addresses/_components/form-addresses';

import FormCheckout from './_components/form-checkout';

import { IAddress, IProduct, } from '@/interfaces';

function PageCheckout() {
  const router = useRouter();

  const [ addresses, setAddresses, ] = useState<IAddress[] | null>( null );
  const { items, clearCart, } = productCartStore() as IProductCartStore;
  const { user, } = usersStore() as IUsersStore;
  const [ loading, setLoading, ] = useState( false );
  const [ selectedAddress, setSelectedAddress, ] = useState<IAddress | null>( null );
  const [ openAddressForm, setOpenAddressForm, ] = useState( false );
  const [ reloadAddresses, setReloadAddresses, ] = useState( false );
  const [ paymentIntentToken, setPaymentIntentToken, ] = useState<string | undefined>( undefined );
  const [ openCheckoutForm, setOpenCheckoutForm, ] = useState( false );

  useEffect( () => {
    const fetchData = async() => {
      if ( !user.id ) {
        return;
      }
      try {
        setLoading( true );
        const response : any = await getAddressesByUserId( user.id.toString() );
        if ( response.success ) {
          setAddresses( response.data );
        } else {
          throw new Error( response.message );
        }
      } catch ( error ) {
        console.error( error );
        toast.error( 'Error fetching addresses' );
      } finally {
        setLoading( false );
        setReloadAddresses( false );
      }
    };
    fetchData();
  }, [ user.id, reloadAddresses, ] );

  let total = 0;
  let subTotal = 0;
  items.forEach( ( item : IProduct ) => {
    subTotal += item.price * item.quantity;
  } );

  const deliveryFee = subTotal * 0.1;

  total = subTotal + deliveryFee;

  const handleCheckout = async() => {
    try {
      setLoading( true );
      const response : any = await getStripePaymentIntentToken( total );
      if ( !response.success ) {
        toast.error( 'Failed to checkout' );

        return;
      }
      // toast.success( 'Stripe token received' );
      setPaymentIntentToken( response.data );
      setOpenCheckoutForm( true );
    } catch ( error ) {
      console.error( error );
      toast.error( 'Failed to checkout' );
    } finally {
      setLoading( false );
    }
  };

  const stripePromise = loadStripe( process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '' );

  const options : any = {
    clientSecret: paymentIntentToken,
  };

  const onPaymentSuccess = async( paymentId : string ) => {
    try {
      const payload = {
        orderPayload: {
          customer_id: user.id,
          payment_id: paymentId,
          address_id: selectedAddress?.id,
          sub_total: subTotal,
          tax_shipping_fee: deliveryFee,
          total: total,
          order_status: 'order_placed',
        },
        items,
      };

      const response : any = await saveOrderAndOrderItems( payload );
      if ( !response.success ) {
        toast.error( 'Failed to save order' );

        return;
      }

      toast.success( 'Order placed successfully' );
      router.push( '/user/checkout/success' );
      setOpenCheckoutForm( false );
      clearCart();
    } catch ( error ) {
      toast.error( 'Failed to save order' );
    }
  };

  return (
    <div>
      <TitlePage title="Checkout" />

      <h1 className="text-xl font-bold text-gray-600 mb-4">Total: $ { total.toFixed( 2 ) }</h1>

      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-gray-600">Select Address</h2>
        { addresses && addresses.length > 0 && (
          <div className="flex flex-col gap-2">
            { addresses.map( ( address : IAddress ) => (
              <button
                key={ address.id }
                className={ clsx(
                  'flex flex-col items-start gap-2 border-2 border-gray-300 p-4 rounded cursor-pointer hover:bg-gray-100',
                  selectedAddress?.id === address.id && 'border-primary'
                ) }
                onClick={ () => setSelectedAddress( address ) }
              >
                <span className="text-sm font-semibold">{ address.name } { address.phone_number } - { address.email }</span>
                <span className="text-sm text-gray-600">{ address.address }</span>
                <span className="text-sm text-gray-600">{ address.country }, { address.city }, { address.postal_code }</span>
              </button>
            ) ) }
          </div>
        ) }
        <div className="flex justify-end">
          <Button
            asChild
            variant="ghost"
            className="cursor-pointer underline"
            onClick={ () => setOpenAddressForm( true ) }
          >
            <span>Add new address</span>
          </Button>
        </div>
        <div className="flex justify-end gap-4">
          <Button
            asChild
            variant="outline"
          >
            <Link href="/user/cart">Back to cart</Link>
          </Button>
          <Button
            variant="default"
            disabled={ !selectedAddress || loading }
            onClick={ handleCheckout }
          >
            Proceed to payment
          </Button>
        </div>
      </div>

      { openAddressForm && (
        <FormAddresses
          openAddressForm={ openAddressForm }
          setOpenAddressForm={ setOpenAddressForm }
          onSave={ () => setReloadAddresses( true ) }
        />
      ) }

      { openCheckoutForm && (
        <Elements
          stripe={ stripePromise }
          options={ options }
        >
          <FormCheckout
            openCheckoutForm={ openCheckoutForm }
            setOpenCheckoutForm={ setOpenCheckoutForm }
            onPaymentSuccess={ onPaymentSuccess }
          />
        </Elements>
      ) }
    </div>
  );
}

export default PageCheckout;
