import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


// function initializeAppFactory(httpClient: HttpClient): () => any {
//   console.log("Is in intializer");
//   console.log("Client is: " + httpClient);
//   const myPromise = httpClient.get("http://localhost:3000/assets/config/env.json").toPromise();
//     // .pipe(
//     //    tap(data => console.log('Been there, done that: ' + JSON.stringify(data)))
//     // );
//     myPromise.then(data => {
//        console.log('Been there, done that: ' + JSON.stringify(data));
//      });
//   return () => myPromise;
//
//   // return () => httpClient.get("http://localhost:3000/assets/config/env.json")
//   //  .pipe(
//   //     tap(data => console.log('Been there, done that: ' + JSON.stringify(data)))
//   //  );
// }

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    // {
    //    provide: APP_INITIALIZER,
    //    useFactory: initializeAppFactory,
    //    multi: true,
    //    deps: [ HttpClient ]
    // }
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
