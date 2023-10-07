import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from "./services/loader.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public isLoad: boolean;
  public destroy$: Subject<void> = new Subject<void>();

  constructor(
    private loaderService: LoaderService,
    private cdr: ChangeDetectorRef
    ) {
  }

  ngOnInit(): void {
    this.loaderService.isLoading
      .pipe(takeUntil(this.destroy$))
      .subscribe(isLoad => {
        this.isLoad = isLoad;
        this.cdr.detectChanges()
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
