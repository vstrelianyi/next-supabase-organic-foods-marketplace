'use server';

import Stripe from 'stripe';

const stripeClient = new Stripe( process.env.STRIPE_SECRET_KEY || '' );

export async function getStripePaymentIntentToken( amount : number ) {
  console.log( 'getStripePaymentIntentToken', parseFloat( amount.toString() ) );
  try {
    const paymentIntent = await stripeClient.paymentIntents.create( {
      amount: Math.round( parseFloat( amount.toString() ) * 100 ),
      currency: 'usd',
      payment_method_types: [ 'card', ],
      description: 'Payment for Organic Foods',
    } );
    console.log( paymentIntent );

    return {
      success: true,
      data: paymentIntent.client_secret,
    };
  } catch ( error : any ) {
    return {
      success: false,
      message: error.message,
    };
  }
}
