import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: []
})
export class AppModule implements DoBootstrap {

  constructor(private injector: Injector) {}

  public ngDoBootstrap(): void {
    const customAngularElement = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('simple-webcomponent', customAngularElement);
  }
}
