import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProfileService } from "../../services/profile.service";
import { iif } from "rxjs";
import { SnackbarService } from "../../services/snackbar.service";
import { ErrorListService } from "../../services/error-list.service";
import { IAuthor } from "../../models/article";

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html'
})
export class FollowButtonComponent {
  public isSubmitting = false;

  @Input() profile!: IAuthor;
  @Output() toggle = new EventEmitter<IAuthor>();

  constructor(
    private profileService: ProfileService,
    private snackbarService: SnackbarService,
    private errorListService : ErrorListService
  ) {}

  public toggleFollowing(): void {
    this.isSubmitting = true;

    iif(
      () => this.profile.following,
      this.profileService.unfollow(this.profile.username),
      this.profileService.follow(this.profile.username)
      )
      .subscribe({
        next: (profile) => {
          this.isSubmitting = false;
          this.toggle.emit(profile);
        },
        error: (err) => {
          this.isSubmitting = false;
          this.snackbarService.openSnackbar(this.errorListService.getErrorList(err));
        },
      })
  }
}
