'use server';

import supabase from '@/config/supabase';

export async function getUsersReport() {
  try {
    const { data, error, } = await supabase.rpc( 'get_users_report' );
    if ( error ) {
      throw new Error( error.message );
    }

    const resultObj = {
      totalUsers: data[ 0 ].total_users,
      totalCustomers: data[ 0 ].total_customers,
      totalSellers: data[ 0 ].total_sellers,
      totalAdmins: data[ 0 ].total_admins,
    };

    return {
      success: true,
      data: resultObj,
    };
  } catch ( error : any ) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function getOrdersReport() {
  try {
    const { data, error, } = await supabase.rpc( 'get_orders_report' );
    if ( error ) {
      throw new Error( error.message );
    }

    const resultObj = {
      totalOrders: data[ 0 ].total_orders,
      totalOrdersCancelled: data[ 0 ].total_orders_cancelled,
      totalRevenue: data[ 0 ].total_revenue,
      totalRefunds: data[ 0 ].total_refunds,
    };

    return {
      success: true,
      data: resultObj,
    };
  } catch ( error : any ) {
    return {
      success: false,
      message: error.message,
    };
  }
}
