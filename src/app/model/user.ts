import { Href } from './href';
import { Link } from './link';

export interface User {

  username: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  links?: Array<Link>;
  _links?: {
    timetable: Href;
    representatives: Href;
    allInstitutions: Href,
    recognizedInstitutions: Href,
    searchBy: Href,
    workPlaces: Href,
    visits: Href,
    updateUser: Href,
    createWorkPlace: Href
  };
}
