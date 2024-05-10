import { Injectable } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { validatorsInputValidator } from '../CustomValidators/validatorsInput.validator';
import {
  constantsPropertyFields,
  validationsConst,
} from '../Common/allConstants';

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
  setFormValidators(
    form: FormGroup,
    type: string,
    index: number,
    name: string
  ) {
    // saved control group in a constant




    const valueControls: FormGroup = (form?.get('arr') as FormArray).controls[
      index
    ] as FormGroup;

    //  For Email Validators
    if (String(type) === constantsPropertyFields.EMAIL) {
      valueControls?.controls['value'].setValidators([
        Validators.required,
        Validators.email,
      ]);

      // For Salary Validators
    } else if (
      String(type) === constantsPropertyFields.NUMBER &&
      name === validationsConst.SALARY
    ) {
      valueControls?.controls['value'].setValidators([
        Validators.required,
        // Validators.maxLength(10),
        validatorsInputValidator.invalidSalary,
        validatorsInputValidator.numeric,
      ]);

      // For Phone number Validators
    } else if (
      String(type) === constantsPropertyFields.NUMBER &&
      name === validationsConst.PHONE_NUMBER
    ) {
      console.log('Inside Phone Number');
      valueControls?.controls['value'].setValidators([
        Validators.required,
        Validators.maxLength(10),
        // validatorsInputValidator.invalidSalary,
        validatorsInputValidator.numeric,
      ]);

      // For Date Validators
    } else if (String(type) === constantsPropertyFields.DATE) {
      valueControls?.controls['value'].setValidators([
        Validators.required,
        validatorsInputValidator.LessThanToday,
      ]);
    } else if (String(type) === constantsPropertyFields.TEXT) {
      valueControls?.controls['value'].setValidators([
        Validators.required,
        validatorsInputValidator.spacesFrontAndBack,
      ]);
    } else {
      valueControls?.controls['value'].setValidators([Validators.required]);
    }

    valueControls?.controls['value'].updateValueAndValidity();
  }

  constructor() {}
}
