import { schema } from 'normalizr';

export const eventSchema = new schema.Entity('events');
export const eventListSchema = new schema.Array(eventSchema);
