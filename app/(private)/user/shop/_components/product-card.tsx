'use client';

import { Plus, Minus, } from 'lucide-react';
import Image from 'next/image';
import { useState, } from 'react';
import { toast, } from 'react-hot-toast';

import { Button, } from '@/components/ui/button';
import productCartStore, { IProductCartStore, } from '@/store/store-product-cart';

import { IProduct, } from '@/interfaces';

export default function ProductCard( { product, } : { product : IProduct } ) {
  const [ showDescription, setShowDescription, ] = useState( false );
  const { items, addProductToCart, updateProductQuantity, deleteProductFromCart, } = productCartStore() as IProductCartStore;

  const productInCart = items.find( ( item ) => item.id === product.id );
  const quantityInCart = productInCart ? productInCart.quantity : 0;

  const handleAddToCart = () => {
    try {
      if ( productInCart ) {
        updateProductQuantity( product.id, productInCart.quantity + 1 );
      } else {
        addProductToCart( {
          ...product,
          quantity: 1,
        } );
      }
    } catch ( error ) {
      console.error( error );
      toast.error( 'Error adding product to cart' );
    }
  };

  const handleRemoveFromCart = () => {
    try {
      if ( quantityInCart > 0 ) {
        updateProductQuantity( product.id, quantityInCart - 1 );
      }
    } catch ( error ) {
      console.error( error );
    }
  };

  return ( <div className="p-5 border border-gray-300 rounded-lg">
    <h1 className="text-sm font-bold">{ product.name }</h1>
    <p className="text-xs text-gray-500">Seller: { product?.user_profiles?.name }</p>
    <hr className="my-2 border border-gray-300" />

    <div
      className="flex justify-center mb-6 relative w-full aspect-square"
      onMouseEnter={ () => setShowDescription( true ) }
      onMouseLeave={ () => setShowDescription( false ) }
    >
      <Image
        src={ product.images[ 0 ] }
        alt={ product.name }
        fill
        style={ { objectFit: 'contain', } }

      />
      { showDescription && (
        <>
          <div className="bg-accent absolute top-0 left-0 w-full h-full opacity-70"></div>
          <p className="flex justify-center items-center w-full h-full absolute top-0 left-0 text-xs text-black">
            { product.description }
          </p>
        </>
      ) }
    </div>

    <div className="flex justify-between items-center">
      <p className="text-sm font-bold">${ product.price }</p>

      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="icon"
          onClick={ handleRemoveFromCart }
          disabled={ quantityInCart <= 0 }
        >
          <Minus size={ 26 }/>
        </Button>
        { quantityInCart > 0 && <span>{ quantityInCart }</span> }
        <Button
          variant="secondary"
          size="icon"
          onClick={ handleAddToCart }
        >
          <Plus size={ 26 }/>
        </Button>
      </div>
    </div>
  </div>
  );
}
