'use client';

import { useEffect, useState, } from 'react';
import toast from 'react-hot-toast';

import { getOrdersReport, getUsersReport, } from '@/actions/dashboard';
import TitlePage from '@/components/ui/title-page';

import CardDashboard from './_components/card-dashboard';

const PageDashboard = () => {
  const [ usersReport, setUsersReport, ] = useState( {
    totalUsers: 0,
    totalCustomers: 0,
    totalSellers: 0,
    totalAdmins: 0,
  } );

  const [ ordersAndRevenueReport, setOrdersAndRevenueReport, ] = useState( {
    totalOrders: 0,
    totalOrdersCancelled: 0,
    totalRevenue: 0,
    totalRefunds: 0,
  } );

  const [ productsReport, setProductsReport, ] = useState( {
    totalProducts: 0,
    totalCategories: 0,
    totalSubcategories: 0,
  } );

  const fetchReports = async() => {
    try {
      const usersReport : any = await getUsersReport();
      if ( usersReport.error ) {
        throw new Error( usersReport.error );
      }
      setUsersReport( usersReport.data );
    } catch ( error ) {
      console.error( error );
      toast.error( 'Failed to fetch users reports' );
    }

    try {
      const ordersAndRevenueReport : any = await getOrdersReport();
      if ( ordersAndRevenueReport.error ) {
        throw new Error( ordersAndRevenueReport.error );
      }
      console.log( ordersAndRevenueReport.data );
      setOrdersAndRevenueReport( ordersAndRevenueReport.data );
    } catch ( error ) {
      console.error( error );
      toast.error( 'Failed to fetch orders reports' );
    }
  };

  useEffect( () => {
    fetchReports();
  }, [] );

  return (
    <div>
      <TitlePage
        title="Dashboard"
        className="mb-4"
      />

      <div className="flex flex-col gap-1 mb-8">
        <h1 className="font-bold mb-4 text-green-500">Users</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <CardDashboard
            title="Total Users"
            value={ usersReport.totalUsers }
            isAmount={ false }
            description="Total number of users"
          />
          <CardDashboard
            title="Total Customers"
            value={ usersReport.totalCustomers }
            isAmount={ false }
            description="Total number of customers"
          />
          <CardDashboard
            title="Total Sellers"
            value={ usersReport.totalSellers }
            isAmount={ false }
            description="Total number of sellers"
          />
          <CardDashboard
            title="Total Admins"
            value={ usersReport.totalAdmins }
            isAmount={ false }
            description="Total number of admins"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1 mb-8">
        <h1 className="font-bold mb-4 text-green-500">Orders and Revenue</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          <CardDashboard
            title="Total Orders"
            value={ ordersAndRevenueReport.totalOrders }
            isAmount={ false }
            description="Total number of orders"
          />
          <CardDashboard
            title="Cancelled Orders"
            value={ ordersAndRevenueReport.totalOrdersCancelled }
            isAmount={ false }
            description="Total number of cancelled orders"
          />
          <CardDashboard
            title="Total Revenue"
            value={ ordersAndRevenueReport.totalRevenue }
            isAmount={ true }
            description="Total gross revenue"
          />
          <CardDashboard
            title="Total Refunds"
            value={ ordersAndRevenueReport.totalRefunds }
            isAmount={ true }
            description="Total number of refunds"
          />
          <CardDashboard
            title="Net Revenue"
            value={ ordersAndRevenueReport.totalRevenue - ordersAndRevenueReport.totalRefunds }
            isAmount={ true }
            description="Total Revenue"
          />
        </div>
      </div>

    </div>
  );
};

export default PageDashboard;