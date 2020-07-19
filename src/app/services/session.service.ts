import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public data: {
    name: string,
    token: string
  };

  constructor(private router: Router) {
  }

  get displayName(): string {
    return this.data?.name || 'Anonymous User';
  }

  public attemptLogin(email: string, password: string): Observable<unknown> {
    return of(true).pipe(
      delay(400),
      tap(() => {
        this.data = {
          name: email.split('@')[0].split('.').map(e => e.charAt(0).toLocaleUpperCase() + e.slice(1)).join(' '),
          token: 'somefakejwttoken'
        }
      })
    );
  }

  public logout(): void {
    this.data = null;
    this.router.navigateByUrl('/login');
  }
}
