import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environmentKey, Environment } from './../../environments/runtime/environment';
import { EMPTY, Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  private _state: EnvironmentState = 'INITIAL';
  private _stateSubject: BehaviorSubject<EnvironmentState> = new BehaviorSubject<EnvironmentState>('INITIAL');

  private _environment!: Environment;

  constructor(private httpClient: HttpClient) {}

  public environment(): Environment {
    return this._environment;
  }

  public loadEnvironment(baseUrl: string): Observable<Environment> {
    this._stateSubject.next('LOADING');

    return this.httpClient.get<Environment>(`${baseUrl}assets/config/env.json`)
                .pipe(
                  tap(this.defineEnvironment),
                  tap(env => this._environment = env),
                  tap(_ => this._stateSubject.next('LOADED')),
                  catchError(e => {
                    this._stateSubject.next('ERROR');

                    return throwError(() => new Error('Could not load env'));
                  })
                );
  }

  public stateSubject(): BehaviorSubject<EnvironmentState> {
    return this._stateSubject;
  }

  private defineEnvironment(env: Environment): void {
    (window as { [key: string]: any }) [environmentKey] = env;
  }
}

export type EnvironmentState = 'INITIAL' | 'LOADING' | 'LOADED' | 'ERROR';
