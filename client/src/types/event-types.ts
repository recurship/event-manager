import { OrganisationType } from './organisation-types';
import { LocationType } from './location-types';
import { SponsorType } from './sponsor-types';
import { AttendeeType } from './attendee-types';

export type EventType = {
  id: number,
  title: string,
  description: string,
  startDateTime: Date | string,
  endDateTime: Date | string,
  organisation: OrganisationType,
  cover: string,
  location: LocationType,
  sponser: Array<SponsorType>,
  attendees: Array<AttendeeType>,
};
