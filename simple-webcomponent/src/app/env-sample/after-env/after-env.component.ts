import { Component, OnInit } from '@angular/core';

import { environment } from './../../../environments/runtime/environment';

@Component({
  selector: 'app-after-env',
  templateUrl: './after-env.component.html',
  styleUrls: ['./after-env.component.css']
})
export class AfterEnvComponent implements OnInit {

  environment = environment;

  constructor() { }

  ngOnInit(): void {
    console.log("Component init");
  }

}
