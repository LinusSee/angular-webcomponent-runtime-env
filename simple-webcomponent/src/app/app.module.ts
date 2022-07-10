import { APP_INITIALIZER, DoBootstrap, Injector, Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AppComponent } from './app.component';
import { EnvSampleModule } from './env-sample/env-sample.module';


// @Injectable()
// export class AppConfigService {
//   constructor(private http: HttpClient) {}
//
//   public loadAppConfig() {
//     return this.http.get('http://localhost:3000/assets/config/env.json')
//               .toPromise()
//               .then(_ => {
//                 console.log('Been there, done that.');
//               });
//   };
// }
//
// const appInitializerFn = (appConfigService: AppConfigService) => {
//   return () => {
//     return appConfigService.loadAppConfig();
//   };
// };

function initializeAppFactory(httpClient: HttpClient): () => any {
  console.log("Is in intializer");
  console.log("Client is: " + httpClient);
  const myPromise = httpClient.get("http://localhost:3000/assets/config/env.json").toPromise();
    // .pipe(
    //    tap(data => console.log('Been there, done that: ' + JSON.stringify(data)))
    // );
    myPromise.then(data => {
       console.log('Been there, done that: ' + JSON.stringify(data));
     });
  return () => myPromise;

  // return () => httpClient.get("http://localhost:3000/assets/config/env.json")
  //  .pipe(
  //     tap(data => console.log('Been there, done that: ' + JSON.stringify(data)))
  //  );
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    EnvSampleModule
  ],
  providers: [
    // {
    //    provide: APP_INITIALIZER,
    //    useFactory: initializeAppFactory,
    //    multi: true,
    //    deps: [ HttpClient ]
    // }
  ]
})
export class AppModule implements DoBootstrap {

  constructor(private injector: Injector) {}

  public ngDoBootstrap(): void {
    const customAngularElement = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('simple-webcomponent', customAngularElement);
  }
}
