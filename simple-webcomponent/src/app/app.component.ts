import { APP_INITIALIZER, Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { EnvironmentState, EnvironmentService } from './services/environment.service';

import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {

  public state!: EnvironmentState;


  @Input('environment')
  public parentEnvironment!: { targetUrl: string, someField: string };

  constructor(private httpClient: HttpClient, public environment: EnvironmentService) {
    this.environment.stateSubject().subscribe(state => this.state = state);
  }

  public ngOnInit(): void {
    console.log('App Component Init');
    this.loadEnv();
  }

  public environmentAsString(): string {
    return JSON.stringify(this.parentEnvironment);
  }

  private async loadEnv(): Promise<void> {
    await this.environment.loadEnvironment(this.parentEnvironment.targetUrl).toPromise();
  }
}
