import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  @Input() length: number;
  @Input() pageIndex: number;
  @Output() changePage = new EventEmitter<PageEvent>();

  public pageChangeEvent(event: PageEvent): void {
    this.changePage.emit(event);
  }
}
