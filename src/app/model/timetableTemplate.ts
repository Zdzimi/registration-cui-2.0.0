import { Place } from 'src/app/model/place';
import { Day } from './day';

export interface TimetableTemplate {

  year: number;
  month: number;
  days: Array<Day>;
  visitLength: number;
  places: Array<Place>;
}
