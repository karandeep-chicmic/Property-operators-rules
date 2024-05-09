import { Injectable } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { validatorsInputValidator } from '../CustomValidators/validatorsInput.validator';

@Injectable({
  providedIn: 'root',
})
export class RequiredFunctionsService {
  // to remove the previous validators
  removeValidators(form: FormGroup, i: number) {
    ((form?.get('arr') as FormArray).controls[i] as FormGroup)?.controls[
      'value'
    ].clearValidators();
  }

  // to set validators and update their validity
  setFormValidators(form: FormGroup, type: string, index: number) {
    // saved control group in a constant
    const valueControls: FormGroup = (form?.get('arr') as FormArray).controls[
      index
    ] as FormGroup;

    //  For Email Validators
    if (String(type) === 'email') {
      valueControls?.controls['value'].setValidators([
        Validators.required,
        Validators.email,
      ]);

      // For number Validators
    } else if (String(type) === 'number') {
      valueControls?.controls['value'].setValidators([
        Validators.required,
        validatorsInputValidator.numeric,
      ]);

      // For text Validators
    } else if (String(type) === 'date') {
      valueControls?.controls['value'].setValidators([Validators.required]);
    } else {
      valueControls?.controls['value'].setValidators([Validators.required]);
    }

    valueControls?.controls['value'].updateValueAndValidity();
  }

  constructor() {}
}
