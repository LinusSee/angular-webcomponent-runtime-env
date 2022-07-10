import { Injectable } from '@angular/core';

import { fetchEnvironment } from './../../environments/runtime/environment';
import { EMPTY, Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  private _state: EnvironmentState = 'INITIAL';
  private _stateSubject: BehaviorSubject<EnvironmentState> = new BehaviorSubject<EnvironmentState>('INITIAL');

  constructor() {}

  public loadEnvironment(baseUrl: string): Observable<any> {
    this._stateSubject.next('LOADING');

    return fetchEnvironment(baseUrl)
              .pipe(
                tap(data => console.log("Env is: " + data)),
                tap(_ => this._stateSubject.next('LOADED')),
                catchError(e => {
                  console.error('Fehler beim Laden des Environments. Wie geht man mit einem Fehler an dieser Stelle um?');

                  // Stops execution (does not load components that depend on the environment)
                  return throwError(() => new Error('Could not load env'));
                })
              )
  }

  public stateSubject(): BehaviorSubject<EnvironmentState> {
    return this._stateSubject;
  }
}

export type EnvironmentState = 'INITIAL' | 'LOADING' | 'LOADED' | 'ERROR';
