import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { map, take } from 'rxjs';

export const withAuth: CanActivateFn = () => {
  const router = inject(Router);

  return inject(UserService).isAuthenticated.pipe(
    take(1),
    map(isAuth => (isAuth ? true : router.createUrlTree(['/login'])))
  );
};

export const withoutAuth: CanActivateFn = () => {
  const router = inject(Router);

  return inject(UserService).isAuthenticated.pipe(
    take(1),
    map(isAuth => (!isAuth ? true : router.createUrlTree(['/'])))
  );
};
