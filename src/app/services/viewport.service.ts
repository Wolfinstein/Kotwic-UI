import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent, debounceTime, map, startWith } from 'rxjs';

export type Breakpoint = 'mobile-sm' | 'mobile-lg' | 'tablet' | 'desktop';

const BREAKPOINT_MOBILE_SM_MAX = 480;
const BREAKPOINT_MOBILE_LG_MAX = 768;
const BREAKPOINT_TABLET_MAX   = 1024;
@Injectable({
  providedIn: 'root'
})
export class ViewportService {
  private viewportWidth$ = new BehaviorSubject<number>(this.getWidth());
  private breakpoint$ = this.viewportWidth$.pipe(
    map(width => this.getBreakpoint(width)),
    startWith(this.getBreakpoint(this.getWidth()))
  );
  isMobile$: Observable<boolean> = this.breakpoint$.pipe(
    map(bp => bp === 'mobile-sm' || bp === 'mobile-lg')
  );
  isTablet$: Observable<boolean> = this.breakpoint$.pipe(
    map(bp => bp === 'tablet')
  );
  isDesktop$: Observable<boolean> = this.breakpoint$.pipe(
    map(bp => bp === 'desktop')
  );
  breakpoint: Breakpoint = 'desktop';
  constructor(private ngZone: NgZone) {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, 'resize')
        .pipe(
          debounceTime(150),
          map(() => this.getWidth()),
          startWith(this.getWidth())
        )
        .subscribe(width => {
          this.viewportWidth$.next(width);
        });
    });
    this.breakpoint$.subscribe(bp => {
      this.breakpoint = bp;
    });
  }
  private getWidth(): number {
    return window.innerWidth;
  }
  private getBreakpoint(width: number): Breakpoint {
    if (width <= BREAKPOINT_MOBILE_SM_MAX) return 'mobile-sm';
    if (width <= BREAKPOINT_MOBILE_LG_MAX) return 'mobile-lg';
    if (width <= BREAKPOINT_TABLET_MAX) return 'tablet';
    return 'desktop';
  }
  getCurrentBreakpoint(): Breakpoint {
    return this.getBreakpoint(this.getWidth());
  }
  isCurrentlyMobile(): boolean {
    const bp = this.getCurrentBreakpoint();
    return bp === 'mobile-sm' || bp === 'mobile-lg';
  }
  isCurrentlyTablet(): boolean {
    return this.getCurrentBreakpoint() === 'tablet';
  }
  isCurrentlyDesktop(): boolean {
    return this.getCurrentBreakpoint() === 'desktop';
  }
}
