import { Owner } from './owner-types';
export type OrganisationType = {
  id: number,
  name: string,
  isActive: boolean,
  owner: Owner,
  logo: string,
  description: string,
};
