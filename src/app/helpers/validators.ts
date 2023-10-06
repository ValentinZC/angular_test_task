import { AbstractControl, ValidationErrors } from "@angular/forms";
import { REG_EXP_EMAIL, REG_EXP_PASSWORD } from "../constants/regExp";
import { INVALID_EMAIL, INVALID_PASSWORD } from "../constants/validation";

export const emailValidator = (control: AbstractControl): ValidationErrors | null => {
  return control.value && !REG_EXP_EMAIL.test(control.value)
    ? { msg: INVALID_EMAIL}
    : null;
};

export const passwordValidator = (control: AbstractControl): ValidationErrors | null => {
  return control.value && !REG_EXP_PASSWORD.test(control.value)
    ? { msg: INVALID_PASSWORD}
    : null;
};
