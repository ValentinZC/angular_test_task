import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from "./services/loader.service";
import { Observable, Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public loader$: Observable<boolean>
  public destroy$: Subject<void> = new Subject<void>();

  constructor(
    private loaderService: LoaderService,
    ) {
  }

  ngOnInit(): void {
    this.loader$ = this.loaderService.isLoading.asObservable().pipe(takeUntil(this.destroy$));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
