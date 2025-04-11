'use server';

import { currentUser, } from '@clerk/nextjs/server';

import supabase from '@/config/supabase';

export const saveClerkUserToSupabase = async ( clerkUser : any ) => {
  console.log( 'saveClerkUserToSupabase -> clerkUser:', clerkUser );
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
      .single();
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