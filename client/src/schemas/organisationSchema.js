import { schema } from 'normalizr';

export const organisationSchema = new schema.Entity('organisation');
export const organisationListSchema = new schema.Array(organisationSchema);
