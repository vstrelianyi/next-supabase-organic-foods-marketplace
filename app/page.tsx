import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';

function PageHome() {
  return (
    <div className="flex flex-col gap-[20px] items-start justify-start h-screen p-[20px]">
      <h1>PageHome</h1>
      <Button
        variant="default"
        className="w-max"
      >
        Button
      </Button>
      <Input
        placeholder="Search..."
        className="w-max"
      />
    </div>
  );
}

export default PageHome;
