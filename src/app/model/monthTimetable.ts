import { DayTimetable } from './dayTimetable';

export interface MonthTimetable {

  year: number;
  month: number;
  dayTimetables: Array<DayTimetable>;
  emptyDaysBefore?: Array<string>;
  emptyDaysAfter?: Array<string>;
}
