import { create, } from 'zustand';

import { IProduct, } from '@/interfaces';

const productCartStore = create( ( set, get : any ) => ( {
  items: [] as IProduct[],
  addProductToCart: ( product : IProduct ) => {
    const existingItems = [ ...get().items, ];
    existingItems.push( product );
    set( { items: existingItems, } );
  },
  updateProductQuantity: ( productId : string, quantity : number ) => {
    const existingItems = [ ...get().items, ];
    const index = existingItems.findIndex( ( item ) => item.id === productId );
    if ( index !== -1 ) {
      existingItems[ index ].quantity = quantity;
    }
    set( { items: existingItems, } );
  },
  deleteProductFromCart: ( productId : string ) => {
    const existingItems = [ ...get().items, ];
    const index = existingItems.findIndex( ( item ) => item.id === productId );
    if ( index !== -1 ) {
      existingItems.splice( index, 1 );
    }
    set( { items: existingItems, } );
  },
  clearCart: () => {
    set( { items: [], } );
  },
} ) );
export default productCartStore;

export interface IProductCartStore {
  items : IProduct[],
  addProductToCart : ( product : IProduct ) => void,
  updateProductQuantity : ( productId : number, quantity : number ) => void,
  deleteProductFromCart : ( productId : number ) => void,
  clearCart : () => void,
}
