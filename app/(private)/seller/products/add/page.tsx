import TitlePage from '@/components/ui/title-page';
import FormProduct from '../_components/form-product';

function PageAddProduct() {
  return (
    <div className="flex flex-col">
      <TitlePage
        title="Add Product"
        className="mb-6"
      ></TitlePage>
      <FormProduct formType="add"/>
    </div>
  );
}

export default PageAddProduct;