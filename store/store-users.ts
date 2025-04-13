import { create, } from 'zustand';

import { IUser, } from '@/interfaces';

const usersStore = create( ( set ) => ( {
  user: 0,
  setUser: ( user : IUser ) => set( { user, } ),
} ) );
export default usersStore;

export interface IUsersStore {
  user : IUser,
  setUser : ( user : IUser ) => void
}