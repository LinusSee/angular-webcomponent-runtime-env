import { Observable, from } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, tap, map } from 'rxjs/operators';


export interface Environment {
  myEnvIsLoaded: string;
  getResourceUrl: string;
}

// Maybe it would be smarter to use a service instead of writing it into the DOM?
export const environmentKey: string = 'myWebcomponentEnvironment';

export const environment: Environment = proxyEnvironment();


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
