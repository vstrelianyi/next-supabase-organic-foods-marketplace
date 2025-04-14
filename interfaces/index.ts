export interface IUser{
  id : string;
  clerk_user_id : string;
  name : string;
  email : string;
  profile_pic : string;
  is_admin : boolean;
  is_active : boolean;
  is_seller : boolean;
  created_at : string;
}

export interface IProduct{
  id : number;
  seller_id : string;
  name : string;
  category : string;
  price : number;
  stock : number;
  description : string;
  created_at : string;
  images : string[];

  // runtime date
  user_profiles : IUser;
  quantity : number;
}

export interface IAddress{
  id : string;
  name : string;
  email : string;
  phone_number : string;
  postal_code : string;
  country : string;
  city : string;
  address : string;
}
