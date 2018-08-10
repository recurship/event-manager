import { schema } from 'normalizr';

export const userSchema = new schema.Entity('user');
export const userListSchema = new schema.Array(userSchema);
