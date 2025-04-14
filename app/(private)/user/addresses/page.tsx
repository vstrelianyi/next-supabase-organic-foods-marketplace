'use client';

import { Button, } from '@/components/ui/button';
import TitlePage from '@/components/ui/title-page';

export default function PageUserAddresses() {
  return (
    <div className="flex justify-between items-center">
      <TitlePage title="Addresses" />
      <Button>Add Address</Button>
    </div>
  );
}
