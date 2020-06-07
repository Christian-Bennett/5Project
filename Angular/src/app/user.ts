export interface User
{
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  address: {
    street: string,
    city: string,
    state: string,
    zip: number
  }
}