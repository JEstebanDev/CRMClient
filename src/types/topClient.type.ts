export interface TopClientData {
  __typename: string;
  total: number;
  client: Client[];
}

export interface Client {
  __typename: string;
  name: string;
  company: string;
  lastName: string;
  phone: string;
  email: string;
  seller: string;
}

export interface TopClientType {
  __typename: string;
  name: string;
  company: string;
  lastName: string;
  phone: string;
  email: string;
  seller: string;
  total: number;
}
