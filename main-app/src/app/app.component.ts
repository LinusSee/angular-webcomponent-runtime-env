import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public finishedLoadingScript = false;

  public env = { targetUrl: 'http://localhost:3000/', someField: 'testVal'};

  constructor(private http: HttpClient) {}

  public ngOnInit(): void {
     this.loadScript().pipe(
       tap((script: HTMLScriptElement) => document.body.appendChild(script)),
       tap(( _ ) => this.finishedLoadingScript = true),
     ).subscribe();
  }


  private loadScript(): Observable<HTMLScriptElement> {
    const maybeExistingScript: HTMLScriptElement | null = document.querySelector('script[data-webcomponent-name="simple-webcomponent"]');
    const scriptExists = maybeExistingScript !== null;

    const script = scriptExists ?
                    of(maybeExistingScript) :
                    this.http.get('http://localhost:3000/simple-webcomponent/main.js', { responseType: 'blob' })
                       .pipe(
                          map((blob: Blob) => this.createScriptElement(blob)),
                       );
    return script;
  }

  private createScriptElement(blob: Blob): HTMLScriptElement {
    const scriptElement = document.createElement('script');
    scriptElement.src = URL.createObjectURL(blob);
    scriptElement.setAttribute('data-webcomponent-name', 'simple-webcomponent');
    return scriptElement;
  }
}
