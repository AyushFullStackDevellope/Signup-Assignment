export interface Institute {
  name: string;
  city: string;
  state: string;
  type: string;
  logo?: string;
}

export interface User {
  email: string;
  password?: string;
  name: string;
  institutes: Institute[];
  roles: string[];
}
