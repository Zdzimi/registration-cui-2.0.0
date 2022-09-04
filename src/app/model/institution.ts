import { Href } from './href';
import { Link } from './link';

export interface Institution {

  institutionName: string;
  province: string;
  city: string;
  street: string;
  gateNumber: string;
  premisesNumber: string;
  typeOfService: string;
  description: string;
  links?: Array<Link>;
  _links?: {
    places?: Href;
    representatives?: Href;
    getNextTemplate?: Href;
    currentYear?: Href;
    currentMonth?: Href;
    currentDay?: Href;
  };
}
