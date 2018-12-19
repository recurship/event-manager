import { Owner } from './owner-types';
export type OrganisationType = {
  id: number,
  name: string,
  isActive: boolean,
  owner: Owner,
  logo: string,
  description: string,
  email: string,
  contactNumber: string,
  facebook: string,
  twitter: string,
};
