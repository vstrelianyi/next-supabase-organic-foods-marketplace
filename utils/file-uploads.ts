'use server';

import supabase from '@/config/supabase';
import dayjs from 'dayjs';

export const uploadFileAndGetUrl = async ( file : File ) => {
  try {
    const extension = file.name.split( '.' ).pop();
    const baseName = file.name.substring( 0, file.name.lastIndexOf( '.' ) );
    const dateStr = dayjs().format( 'YYYYMMDD-hh-mm' );
    const fileName = `${baseName}_${dateStr}.${extension}`;
    const { data, error, } = await supabase.storage.from( 'default' )
      .upload( fileName, file );

    if ( error ) {
      throw new Error( error.message );
    }
    const { data : urlResponse, } = await supabase.storage.from( 'default' ).getPublicUrl( fileName );
    return {
      success: true,
      url: urlResponse.publicUrl,
    };
  } catch ( error : any ) {
    return {
      success: false,
      message: error.message,
    };
  }
};