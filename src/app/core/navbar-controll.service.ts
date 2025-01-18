import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarControllService {

  constructor() { }

  private currentValueSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public currentValue$: Observable<boolean> = this.currentValueSubject.asObservable();

  setCurrentValue(value: boolean): void {
    this.currentValueSubject.next(value);
  }
}
