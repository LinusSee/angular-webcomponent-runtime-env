import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AfterEnvComponent } from './after-env/after-env.component';


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
  providers: []
})
export class EnvSampleModule { }
