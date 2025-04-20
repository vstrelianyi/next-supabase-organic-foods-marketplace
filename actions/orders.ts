'use server';

import Stripe from 'stripe';

import supabase from '@/config/supabase';

const stripeClient = new Stripe( process.env.STRIPE_SECRET_KEY || '' );

export const saveOrderAndOrderItems = async( {
  orderPayload,
  items,
} : {
  orderPayload : any,
  items : any[]
} ) => {
  try {
    const { data, error: ordersError, } = await supabase.from( 'orders' ).insert( [ orderPayload, ] )
      .select( 'id' );

    if ( ordersError ) {
      throw new Error( ordersError.message );
    }

    if ( data?.length ) {
      const itemsArrayForTable = items.map( ( item ) => ( {
        seller_id: item.seller_id,
        order_id: data[ 0 ].id,
        product_id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.images[ 0 ],
        total: item.price * item.quantity,
      } ) );

      const { error: itemsError, } = await supabase.from( 'order_items' ).insert( itemsArrayForTable );
      if ( itemsError ) {
        throw new Error( itemsError.message );
      }

      return {
        success: true,
        message: 'Order saved successfully',
      };
    }
  } catch ( error : any ) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getOrdersByUserId = async( userId : string ) => {
  try {
    const { data, error, } = await supabase.from( 'orders' ).select( '*, order_items( * ), addresses( * )' )
      .eq( 'customer_id', userId );
    if ( error ) {
      throw new Error( error.message );
    }

    return {
      success: true,
      data,
    };
  } catch ( error : any ) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getOrderItemsBySellerId = async( sellerId : string ) => {
  try {
    const { data, error, } = await supabase.from( 'order_items' ).select( '*' )
      .eq( 'seller_id', sellerId );
    if ( error ) {
      throw new Error( error.message );
    }

    return {
      success: true,
      data,
    };
  } catch ( error : any ) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const cancelOrderById = async( orderId : string, paymentId : string ) => {
  try {
    const { data, error, } = await supabase.from( 'orders' ).update( {
      order_status: 'cancelled',
    } )
      .eq( 'id', orderId );
    if ( error ) {
      throw new Error ( error.message );
    }

    const refund : any = await stripeClient.refunds.create( {
      payment_intent: paymentId,
    } );

    if ( refund.error ) {
      throw new Error( refund.error.message );
    }

    return {
      success: true,
      message: 'Order cancelled successfully',
    };
  } catch ( error : any ) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getAllOrders = async() => {
  try {
    const { data, error, } = await supabase.from( 'orders' ).select( '*, order_items( * ), addresses( * ), user_profiles( * )' );
    if ( error ) {
      throw new Error( error.message );
    }

    return {
      success: true,
      data,
    };
  } catch ( error : any ) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const markOrderAsDeliveredById = async( orderId : string ) => {
  try {
    const { data, error, } = await supabase.from( 'orders' ).update( {
      order_status: 'delivered',
    } )
      .eq( 'id', orderId );
    if ( error ) {
      throw new Error( error.message );
    }

    return {
      success: true,
      message: 'Order marked as delivered',
    };
  } catch ( error : any ) {
    return {
      success: false,
      message: error.message,
    };
  }
};
