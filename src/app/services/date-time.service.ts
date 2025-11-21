import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {
  private _dateTime = new BehaviorSubject(new Date());
  
  public dateTime$ = this._dateTime.asObservable();

  constructor() {
    // ყოველ წამში დროის განახლება
    interval(1000).pipe(
      map(() => new Date())
    ).subscribe(date => {
      this._dateTime.next(date);
    });
  }
}