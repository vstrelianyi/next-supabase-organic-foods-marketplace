'use server';

import supabase from '@/config/supabase';

export const addNewAddress = async( payload : any ) => {
  try {
    const { error, } = await supabase.from( 'addresses' ).insert( [ payload, ] );
    if ( error ) {
      throw new Error( error.message );
    }

    return {
      success: true,
      message: 'Address added successfully',
    };
  } catch ( error : any ) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const updateAddressById = async( id : string, payload : any ) => {
  try {
    const { error, } = await supabase.from( 'addresses' ).update( payload )
      .eq( 'id', id );
    if ( error ) {
      throw new Error( error.message );
    }

    return {
      success: true,
      message: 'Address updated successfully',
    };
  } catch ( error : any ) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const deleteAddressById = async( id : string ) => {
  try {
    const { error, } = await supabase.from( 'addresses' ).delete()
      .eq( 'id', id );
    if ( error ) {
      throw new Error( error.message );
    }

    return {
      success: true,
      message: 'Address deleted successfully',
    };
  } catch ( error : any ) {
    return {
      success: false,
      message: error.message,
    };
  }
};
export const getAddressesByUserId = async( user_id : string ) => {
  try {
    const { data, error, } = await supabase.from( 'addresses' ).select( '*' )
      .eq( 'user_id', user_id );
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
