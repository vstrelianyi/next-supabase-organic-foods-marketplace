import { Button, } from '@/components/ui/button';
import TitlePage from '@/components/ui/title-page';
import Link from 'next/link';

function PageSellerProducts() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <TitlePage title="My Products"></TitlePage>
        <Button asChild>
          <Link href="/seller/products/add">
            Add Product
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default PageSellerProducts;