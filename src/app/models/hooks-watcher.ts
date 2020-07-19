import { OnDestroy } from '@angular/core';
import { Subject, Observable, MonoTypeOperatorFunction } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class HooksWatcher implements OnDestroy {
    private _destroyed$: Subject<void> = new Subject();
    public destroyed$: Observable<void> = this._destroyed$.asObservable();

    readonly ngOnDestroy = () => {
        this._destroyed$.next();
        this._destroyed$.complete();
    };

    public takeUntilDestroyed<T>(): MonoTypeOperatorFunction<T> {
        return takeUntil<T>(this.destroyed$);
    }
}
