import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

const SESSION_KEY = 'sessionData';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public data: {
    name: string,
    token: string
  };

  constructor(private router: Router) {
    try {
      this.data = JSON.parse(localStorage.getItem(SESSION_KEY));
    } catch {
      console.warn('Unable to load session data from LS');
    }
  }

  get displayName(): string {
    return this.data?.name || 'Anonymous User';
  }

  public attemptLogin(email: string, password: string): Observable<unknown> {
    return of(true).pipe(
      delay(400),
      tap(() => {
        this.updateSession({
          name: email.split('@')[0].split('.').map(e => e.charAt(0).toLocaleUpperCase() + e.slice(1)).join(' '),
          token: 'somefakejwttoken'
        });
      })
    );
  }

  public logout(): void {
    this.updateSession(null);
    this.router.navigateByUrl('/login');
  }

  private updateSession(data: {name: string, token: string}): void {
    this.data = data;

    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(this.data));
    } catch {
      console.warn('Unable to store session data to LS');
    }
  }
}
