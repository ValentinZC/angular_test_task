import { Component, EventEmitter, Input, Output } from '@angular/core';
import { map, Observable } from "rxjs";
import { UserService } from "../../services/user.service";
import { IComment } from "../../models/comment";

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent {
  public isEditable$: Observable<boolean>;

  @Input() comment!: IComment;
  @Output() remove = new EventEmitter<boolean>();

  constructor(private userService: UserService) {
    this.isEditable$ = this.userService.currentUser
      .pipe(
        map(user => user?.username === this.comment.author.username)
      )
  }

  public onRemove(): void {
    this.remove.emit(true);
  }
}
