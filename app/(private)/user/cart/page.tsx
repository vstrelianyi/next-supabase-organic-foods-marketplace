'use client';

import { Minus, Plus, } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

import { Button, } from '@/components/ui/button';
import TitlePage from '@/components/ui/title-page';
import productCartStore, { IProductCartStore, } from '@/store/store-product-cart';
import usersStore, { IUsersStore, } from '@/store/store-users';

import { IProduct, } from '@/interfaces';

function PageUserCart() {
  const { user, setUser, } = usersStore() as IUsersStore;
  const { items, addProductToCart, updateProductQuantity, deleteProductFromCart, clearCart, } = productCartStore() as IProductCartStore;

  const handleAddToCart = ( product : IProduct ) => {
    try {
      updateProductQuantity( product.id, product.quantity + 1 );
    } catch ( error ) {
      console.error( error );
      toast.error( 'Error adding product to cart' );
    }
  };

  const handleRemoveFromCart = ( product : IProduct ) => {
    try {
      if ( product.quantity > 0 ) {
        updateProductQuantity( product.id, product.quantity - 1 );
      }
    } catch ( error ) {
      console.error( error );
    }
  };

  const renderAmountProperty = ( label : string, value : number ) => {
    return (
      <div className="flex justify-between items-center">
        <span className="text-sm">{ label }</span>
        <span className="text-sm font-bold"> $ { value.toFixed( 2 ) }</span>
      </div>
    );
  };

  let subTotal = 0;
  items.forEach( ( item : IProduct ) => {
    subTotal += item.price * item.quantity;
  } );

  const deliveryFee = subTotal * 0.1;

  return (
    <div>
      <TitlePage
        title="Cart"
        className="mb-5"
      />
      <div className="grid grid-cols-4 gap-5">

        <main className="col-span-3 flex flex-col gap-5">
          <div className="border border-gray-300 rounded flex flex-col gap-5 h-full">
            <div className="grid grid-cols-7 gap-5 bg-gray-100 p-2 text-sm rounded">
              <div className="col-span-3">
                <span>Product</span>
              </div>
              <div className="col-span-2 flex items-center justify-center">
                <span>Quantity</span>
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <span>Price</span>
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <span>Total</span>
              </div>
            </div>
            { items.length > 0 && (
              <div className="flex flex-col gap-5">
                { items.map( ( item : IProduct, index : number ) => (
                  <div
                    key={ item.id }
                    className="grid grid-cols-7 gap-5 p-2 text-sm rounded"
                  >
                    <div className="col-span-3">
                      <span>{ item.name }</span>
                      <Image
                        src={ item.images[ 0 ] }
                        alt={ item.name }
                        width={ 100 }
                        height={ 100 }
                      />
                    </div>

                    <div className="col-span-2 flex items-center justify-center gap-2">
                      <Button
                        variant="secondary"
                        size="icon"
                        onClick={ () => handleRemoveFromCart( item ) }
                        disabled={ item.quantity <= 0 }
                      >
                        <Minus size={ 26 }/>
                      </Button>
                      { item.quantity > 0 && <span>{ item.quantity }</span> }
                      <Button
                        variant="secondary"
                        size="icon"
                        onClick={ () => handleAddToCart( item ) }
                      >
                        <Plus size={ 26 }/>
                      </Button>
                    </div>
                    <div className="col-span-1 flex items-center justify-center">
                      $ { item.price }
                    </div>
                    <div className="col-span-1 flex items-center justify-center">
                      $ { item.price * item.quantity }
                    </div>
                    { ( ( items.length - 1 ) !== index ) && (
                      <div className="col-span-7">
                        <hr className="border border-gray-300" />
                      </div>
                    ) }

                  </div>
                ) ) }
              </div>
            ) }
            { items.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <span className="p-6 text-gray-500">No items in cart</span>
              </div>
            ) }
          </div>

          { items.length > 0 && (
            <Button
              variant="destructive"
              className="self-end"
              onClick={ () => clearCart() }
            >
              Clear cart
            </Button>
          ) }
        </main>

        { /* ASIDE */ }
        <aside className="col-span-1">
          <div className="flex flex-col gap-5 border border-gray-300 rounded p-5">
            <div className="flex flex-col gap-5 mb-4">
              { renderAmountProperty( 'Subtotal', subTotal ) }
              { renderAmountProperty( 'Delivery fee', deliveryFee ) }
              { renderAmountProperty( 'Total', subTotal + deliveryFee ) }
            </div>
            <Button
              variant="default"
              className="w-full"
              asChild
              disabled={ items.length === 0 }
            >
              <Link href="/user/checkout">
                <span>Proceed to Checkout</span>
              </Link>
            </Button>
          </div>

        </aside>

      </div>
    </div>
  );
}

export default PageUserCart;