import { Component } from '@angular/core';
import { UserService } from "../../services/user.service";
import { SnackbarService } from "../../services/snackbar.service";
import { authSuccess } from "../../constants/messages";
import { IUser } from "../../models/user";
import { Observable, Subscriber, tap } from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private userService: UserService,
    private snackbarService: SnackbarService
  ) {
  }

  public logout(): void {
    this.userService.logout()
      .then((success) => {
        success && this.snackbarService.openSnackbar(`${authSuccess.logout} ${authSuccess.register}`);
      })
  }

  public getCurrentUser(): Observable<IUser | null> {
    return this.userService.currentUser
  }
}
