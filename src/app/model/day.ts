import { Time } from '@angular/common';

export interface Day {

  dayOfMonth: number;
  workStart: Time;
  workEnd: Time;
  placeName: string;
}
