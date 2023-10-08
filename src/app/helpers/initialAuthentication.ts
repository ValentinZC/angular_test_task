import { LocalStorageService } from '../services/local-storage.service';
import { UserService } from '../services/user.service';
import { EMPTY } from 'rxjs';

export const initAuth = (
  localStorageService: LocalStorageService,
  userService: UserService
) => {
  return () =>
    localStorageService.getToken() ? userService.getCurrentUser() : EMPTY;
};
