import { ResolveFn } from '@angular/router';
import { throwError, of, delay } from 'rxjs';

export const delayResolver: ResolveFn<boolean> = (route, state) => {
  const duration = route.data['delay'] || 2000; // Default 2s
  const shouldFail = route.data['shouldFail'] || false;

  console.log(`⏳ Resolving route with ${duration}ms delay...`);

  if (shouldFail) {
    return throwError(() => new Error('Simulated API failure'));
  }

  return of(true).pipe(delay(duration));
};
