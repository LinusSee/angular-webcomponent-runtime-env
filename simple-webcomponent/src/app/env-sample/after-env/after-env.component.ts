import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EnvironmentService } from 'src/app/services/environment.service';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// import { environment } from './../../../environments/runtime/environment';

@Component({
  selector: 'app-after-env',
  templateUrl: './after-env.component.html',
  styleUrls: ['./after-env.component.css']
})
export class AfterEnvComponent implements OnInit {

  // env = environment;

  person$!: Observable<{forename: string, surname: string}>;
  person!: {forename: string, surname: string};

  constructor(private httpClient: HttpClient, private environment: EnvironmentService) { }

  ngOnInit(): void {
    const targetUrl = this.environment.environment().getResourceUrl;
    console.log("Component init");
    this.person$ = this.httpClient.get<{forename: string, surname: string}>(targetUrl)
                      .pipe(
                        tap(person => this.person = person)
                      );
  }

}
