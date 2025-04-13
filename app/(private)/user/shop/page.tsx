import { getAllProducts, } from '@/actions/products';
import TitlePage from '@/components/ui/title-page';

import Filters from './_components/filters';
import ProductCard from './_components/product-card';

import { IProduct, } from '@/interfaces';

export default async function PageUserShop() {
  const response : any = await getAllProducts( {
    category: '',
    searchText: '',
    sortBy: '',
  } );

  if ( !response.success ) {
    return <div>{ response.message }</div>;
  }
  console.log( 'response', response.data );

  return (
    <div className="flex flex-col gap-4">
      <TitlePage
        title="Shop Products"
        className="mb-4"
      />
      <Filters />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        { response.data?.map( ( product : IProduct ) => (
          <ProductCard
            key={ product.id }
            product={ product }
          />
        ) ) }
      </div>
    </div>
  );
}