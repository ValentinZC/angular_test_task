import { FormControl } from '@angular/forms';

export interface IAuthForm {
  email: FormControl<string>;
  password: FormControl<string>;
  username?: FormControl<string>;
}

export interface IAuthLogin {
  email: string;
  password: string;
}

export interface IAuthRegister {
  email: string;
  nickname: string;
  password: string;
}
