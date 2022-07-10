import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { EMPTY, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { fetchEnvironment } from './../../environments/runtime/environment';
import { AfterEnvComponent } from './after-env/after-env.component';


function initializeAppFactory(): () => any {
  const promise = fetchEnvironment('')
                    .pipe(
                      tap(data => console.log("Env is: " + data)),
                      catchError(e => {
                        console.error('Fehler beim Laden des Environments. Wie geht man mit einem Fehler an dieser Stelle um?');

                        // Stops execution (does not load components that depend on the environment)
                        return throwError(() => new Error('Could not load env'));
                      })
                    ).toPromise()

  return () => promise;
}


@NgModule({
  declarations: [
    AfterEnvComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AfterEnvComponent
  ],
  providers: [
    // {
    //    provide: APP_INITIALIZER,
    //    useFactory: initializeAppFactory,
    //    multi: true,
    //    // deps: [ HttpClient ]
    // }
  ]
})
export class EnvSampleModule { }
