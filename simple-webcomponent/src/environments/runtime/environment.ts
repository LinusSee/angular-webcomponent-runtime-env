import { Observable, from } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, tap, map } from 'rxjs/operators';


interface Environment {
  myEnvIsLoaded: string;
}

// Maybe it would be smarter to use a service instead of writing it into the DOM?
const environmentKey: string = 'myWebcomponentEnvironment';

export const environment: Environment = proxyEnvironment();

export function fetchEnvironment(baseUrl: string): Observable<Environment> {
  // Maybe use a service and then use HttpClient?
  return fromFetch(`${baseUrl}assets/config/env.json`)
            .pipe(
              switchMap((raw: Response) => from(raw.text())),
              map(data => JSON.parse(data)),
              tap(defineEnvironment)
            );
}

export function defineEnvironment(env: Environment): void {
  (window as { [key: string]: any }) [environmentKey] = env;
}


function proxyEnvironment(): Environment {
  return new Proxy<Environment>(
    {} as unknown as Environment,
    {
      get(target: Environment, p: PropertyKey): unknown {
        return (window as { [key: string]: any }) [environmentKey][p];
      },
      set(target: Environment, p: PropertyKey, value: unknown): boolean {
        (window as { [key: string]: any }) [environmentKey][p] = value;

        return true;
      }
    }
  )
}
