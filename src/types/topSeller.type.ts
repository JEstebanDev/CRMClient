export interface TopSellerType {
  __typename: string;
  name: string;
  lastName: string;
  email: string;
  total: number;
}

export interface TopSellerData {
  __typename: string;
  seller: Seller[];
  total: number;
}

export interface Seller {
  __typename: string;
  name: string;
  lastName: string;
  email: string;
}
