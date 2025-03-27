import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

function PageHome() {
  const menuItems = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'About',
      path: '/about',
    },
    {
      name: 'Contact',
      path: '/contact',
    },
  ];

  return (
    <div className="flex flex-col gap-1 items-stretch justify-start h-screen p-[20px]">
      <div className="flex flex-wrap lg:flex-nowrap justify-between items-center">
        <h1 className="text-2xl font-bold text-ring">Organic Foods Marketplace</h1>
        <div className="flex items-center gap-4 py-2 grow justify-around lg:justify-end">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="text-sm text-gray-600 font-semibold"
            >
              {item.name}
            </Link>
          ))}
          <Button>Login</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 grow">
        <div className="col-span-1 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-primary">
            Organic <b className="text-orange-600">Foods</b> Marketplace
          </h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        </div>
        <div className="col-span-1 flex justify-center items-center">
          <Image
            src="/images/bg-2.png"
            alt="Organic Foods"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
}

export default PageHome;
