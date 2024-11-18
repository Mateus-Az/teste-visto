import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SnackService {
  constructor() {}

  private snackEmitSource = new Subject<any>();
  changeEmittedSnack$ = this.snackEmitSource.asObservable();
  emitSnack(msg: any) {
    this.snackEmitSource.next(msg);
  }

  private snackEmitSourceError = new Subject<any>();
  changeEmittedSnackError$ = this.snackEmitSourceError.asObservable();
  emitSnackError(msg: any) {
    this.snackEmitSourceError.next(msg);
  }
}
