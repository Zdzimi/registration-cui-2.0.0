import { Visit } from './visit';

export interface DayTimetable {

  dayOfMonth: number;
  visits: Array<Visit>;
}
