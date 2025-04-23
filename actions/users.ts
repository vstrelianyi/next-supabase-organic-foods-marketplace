'use server';

import { currentUser, } from '@clerk/nextjs/server';

import supabase from '@/config/supabase';

export const saveClerkUserToSupabase = async ( clerkUser : any ) => {
  // console.log( 'saveClerkUserToSupabase -> clerkUser:', clerkUser );
  try {
    const supabaseUserObj = {
      name: `${clerkUser.firstName} ${clerkUser.lastName}`,
      email: clerkUser.emailAddresses[ 0 ]?.emailAddress,
      clerk_user_id: clerkUser.id,
      profile_pic: clerkUser.imageUrl || '',
      is_admin: false,
      is_seller: false,
      is_active: true,
    };

    const { data, error, } = await supabase.from( 'user_profiles' ).insert( [ supabaseUserObj, ] )
      .select( '*' )
      .single()
		;
    if ( error ) {
      throw new Error( error.message );
    }
    console.log( 'saveClerkUserToSupabase -> data:', data );
    if ( data ) {
      return {
        success: true,
        data: data,
      };
    }
  } catch ( error : any ) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getCurrentUserFromSupabase = async() => {
  try {
    const clerkUser = await currentUser();

    const { data, error, } = await supabase.from( 'user_profiles' ).select( '*' )
      .eq( 'clerk_user_id', clerkUser?.id );
    // console.log( 'getCurrentUserFromSupabase -> clerkUser:', clerkUser?.id );
    // console.log( 'getCurrentUserFromSupabase -> data:', data, typeof data );

    if ( error ) {
      throw new Error( error.message );
    }
    if ( data && data?.length > 0 ) {
      return {
        success: true,
        data,
      };
    }
    const newUserResponse = await saveClerkUserToSupabase( clerkUser );
    if ( !newUserResponse?.success ) {
      throw new Error( newUserResponse?.message );
    }

    return {
      success: true,
      data: newUserResponse.data,
    };
  } catch ( error : any ) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getAllUsers = async( { roleType = '', } : { roleType ?: string } ) => {
  try {
    const query = supabase.from( 'user_profiles' ).select( '*' )
      .order( 'created_at', { ascending: false, } );

    if ( roleType === 'seller' ) {
      query
        .eq( 'is_seller', true )
        .neq( 'is_admin', true );
    }

    const { data, error, } = await query;

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

export const updateUserStatus = async( userId : string, status : boolean ) => {
  try {
    const { data, error, } = await supabase.from( 'user_profiles' ).update( { is_active: status, } )
      .eq( 'id', userId );
    if ( error ) {
      throw new Error( error.message );
    }

    return {
      success: true,
    };
  } catch ( error : any ) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const addSellerRole = async( email : string ) => {
  try {
    if ( !email ) {
      throw new Error( 'Email is required' );
    }
    const { data: existingUser, error: userError, } = await supabase
      .from( 'user_profiles' )
      .select( '*' )
      .eq( 'email', email )
      .single()
			;
    console.log( 'addSeller -> existingUser:', existingUser );
    console.log( 'addSeller -> userError:', userError );

    if ( userError ) {
      throw new Error( userError.message );
    }
    if ( !existingUser ) {
      throw new Error( 'Seller not found' );
    }
    if ( existingUser?.is_seller ) {
      throw new Error( 'User with this email already exists' );
    } else {
      const { data, error, } = await supabase.from( 'user_profiles' )
        .update( {
          is_seller: true,
        } )
        .eq( 'email', email );
      if ( error ) {
        throw new Error( error.message );
      }

      return {
        success: true,
        message: 'Seller added successfully',
      };
    }
  } catch ( error : any ) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const removeSellerRole = async( userId : string ) => {
  console.log( userId );
  try {
    const { data, error, } = await supabase.from( 'user_profiles' )
      .update( {
        is_seller: false,
      } )
      .eq( 'id', userId );

    if ( error ) {
      throw new Error( error.message );
    }

    return {
      success: true,
      message: 'Seller role removed successfully',
    };
  } catch ( error : any ) {
    return {
      success: false,
      message: error.message,
    };
  }
};
