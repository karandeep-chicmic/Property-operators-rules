import { inject } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { PropertyDataService } from '../Services/property-data.service';

export class nameValidator {
  constructor(private propertyData: PropertyDataService) {}
  

  static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(' ') >= 0)
      return { cannotContainSpace: true };

    return null;
  }
  
}
