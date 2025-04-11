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
  id : string;
  seller_id : string;
  name : string;
  category : string;
  price : number;
  stock : number;
  description : string;
  created_at : string;
}
