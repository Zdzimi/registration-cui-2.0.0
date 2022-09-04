import { Href } from './href';
import { Institution } from './institution';
import { Link } from './link';
import { Place } from './place';
import { User } from './user';

export interface Visit {

  visitId: number;
  visitStart: Date;
  visitEnd: Date;
  user: User;
  representative: User;
  placeName: string;
  institution: Institution;
  _links?: {
    visit: Href;
    timetable: Href;
    representatives: Href;
  };
  links?: Array<Link>;
}
