import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { UserService } from '../../services/user.service';

@Directive({
  selector: '[appShowIfAuthed]',
})
export class ShowIfAuthed implements OnInit {
  @Input() appShowIfAuthed = true;

  constructor(
    private templateRef: TemplateRef<any>,
    private userService: UserService,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.userService.isAuthenticated.subscribe(isAuth => {
      this.viewContainer.clear();
      if (isAuth === this.appShowIfAuthed) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }
}
