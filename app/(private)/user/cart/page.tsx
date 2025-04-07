'use client';

import usersStore, { IUsersStore, } from '@/store/store-users';
import React from 'react';

function PageUserCart() {
  const { user, setUser, } = usersStore() as IUsersStore;
  return (
    <div>
      PageUserCart
      <h1>
        { user.email }
      </h1>
    </div>
  );
}

export default PageUserCart;