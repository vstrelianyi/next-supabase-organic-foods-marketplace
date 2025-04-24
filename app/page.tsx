'use client';

import Image from 'next/image';

function PageHome() {
  return (
    <div className="grow flex flex-col gap-1 items-stretch justify-start p-[20px]">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 grow">
        <div className="col-span-1 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-primary">
            Organic
            { ' ' }
            <b className="text-orange-600">
              Foods
            </b>
            { ' ' }
            Marketplace
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </p>
        </div>
        <div className="col-span-1 flex justify-center items-center">
          <Image
            src="/images/bg-2.png"
            alt="Organic Foods"
            width={ 500 }
            height={ 500 }
          />
        </div>
      </div>

    </div>
  );
}

export default PageHome;
