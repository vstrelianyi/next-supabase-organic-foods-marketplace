import { getProductById, } from '@/actions/products';
import TitlePage from '@/components/ui/title-page';

import FormProduct from '../../_components/form-product';

interface PageEditProductProps {
  params : {
    id : string;
  };
}

async function PageEditProduct( { params, } : PageEditProductProps ) {
  const { id, } = params;
  const response : any = await getProductById( id );
  if ( !response.success ) {
    return <div>Error: { response.message }</div>;
  }
  return (
    <div>
      <TitlePage title="Edit Product"></TitlePage>
      <FormProduct
        formType="edit"
        initialValues={ response?.data?.[ 0 ] }
      />
    </div>
  );
}

export default PageEditProduct;