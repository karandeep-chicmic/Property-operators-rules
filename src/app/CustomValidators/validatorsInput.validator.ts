import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

export class validatorsInputValidator {
  static numeric(control: AbstractControl) {
    let val = control.value;

    if (val === null || val === '') return null;

    if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/))
      return { invalidNumber: true };

    return null;
  }

  static LessThanToday(control: FormControl): ValidationErrors | null {
    let today: Date = new Date();

    if (new Date(control.value) > today) return { LessThanToday: true };

    return null;
  }
}
