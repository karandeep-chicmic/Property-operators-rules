import { Component, inject, OnInit } from '@angular/core';
import {
  criteria,
  operators,
  properties,
} from '../../Interfaces/Operators.interface';
import { PropertyDataService } from '../../Services/property-data.service';

import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RequiredFunctionsService } from '../../Services/required-functions.service';
import {
  constantsPropertyFields,
  validationsConst,
} from '../../Common/allConstants';
import { SweetAlertMsgsService } from '../../Services/sweet-alert-msgs.service';
import { Router } from '@angular/router';
import { nameValidator } from '../../CustomValidators/nameValidator.validator';

@Component({
  selector: 'app-property-rules',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './property-rules.component.html',
  providers: [],
  styleUrl: './property-rules.component.css',
})
export class PropertyRulesComponent implements OnInit {
  // All the imported services
  propertyDataService = inject(PropertyDataService);
  formBuilder = inject(FormBuilder);
  requiredFunctions = inject(RequiredFunctionsService);
  router = inject(Router);
  sweetAlertMsgs = inject(SweetAlertMsgsService);

  // All the variables And Reactive form
  mainForm!: FormGroup;
  form!: FormGroup;
  propertyData: properties[] = [];
  operators: string[] = [];
  selectedProperty: properties[] = [];
  inputType: string = constantsPropertyFields.TEXT;
  selectedOption: string = '';
  isCriteria: boolean = false;

  // for getting selected operator and index associated with the property of form-array element
  selectedFormOperators: {
    index?: number;
    type?: string;
    operators?: operators | undefined;
    name?: string; // to store the name of selected property
  }[] = [];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      property: ['', Validators.required],
      operators: ['', Validators.required],
      value: ['', Validators.required],
    });

    this.mainForm = this.formBuilder.group({
      name: ['', [Validators.required, nameValidator.cannotContainSpace]],
      arr: this.formBuilder.array([this.form]),
    });

    this.propertyDataService.getProperties().subscribe((data) => {
      this.propertyData = data;
    });

    // this.propertyData = this.requiredFunctions.formData
  }

  //All the Methods of the Class Are as below.
  addRule() {
    if (this.mainForm.invalid) {
      this.sweetAlertMsgs.showSweetAlertError();
      return;
    }
    const formArray = this.mainForm.get('arr') as FormArray;
    formArray.push(
      this.formBuilder.group({
        property: ['', Validators.required],
        operators: ['', Validators.required],
        value: ['', Validators.required],
      })
    );
  }

  // onSubmitting the main form
  showForm() {
    if (this.mainForm.invalid) {
      this.sweetAlertMsgs.showSweetAlertError();
      return;
    }
    const id: number = this.propertyDataService.idGenerator();

    //  Creating a new criteria object with name = string and rules = array
    const criteriaObj: criteria = {
      id: id,
      name: this.mainForm.controls['name'].value,
      rules: [...this.mainForm.controls['arr'].value],
    };

    //  Pushing the criteria object to the allRules array
    this.propertyDataService.allRules.push({ ...criteriaObj });

    // navigating to display rules
    this.router.navigate(['/displayRules']);
  }

  // to get controls of form-groups in form array
  getControls() {
    return (this.mainForm.get('arr') as FormArray)?.controls;
  }

  //  on changing of property dropdown updates the operators array
  propertyChange(event: any, i: number) {
    const name: string = String(event.target.value);

    // First - we remove the operators from the selectedFormOperators
    this.selectedFormOperators = [
      ...this.selectedFormOperators.filter((data) => {
        if (data.index == i) {
          return false;
        }
        return true;
      }),
    ];

    // Variable to store property selected
    const getProperty: properties =
      this.propertyData.find((data) => {
        if (data.name == name) {
          return true;
        }
        return false;
      }) || {};

    // Second - then we push the operators with associated index to selectedFormOperators
    this.selectedFormOperators.push({
      index: i,
      type: getProperty?.type,
      operators: getProperty?.operators,
      name: name, //To disable the property name option
    });

    // Third - To remove previous validators
    this.requiredFunctions.removeValidators(this.mainForm, i);

    // Fourth - then we set the validators to the form control
    this.requiredFunctions.setFormValidators(
      this.mainForm,
      this.selectedFormOperators[i].type || 'text',
      i,
      name
    );

    // Fifth - set the value input field empty
    (
      (this.mainForm?.get('arr') as FormArray).controls[i] as FormGroup
    ).controls['value'].setValue('');
  }

  // To get the operators of selected property
  getOperators(i: number) {
    // first - we find the operators with associated index from selectedFormOperators
    const operatorsObj: operators =
      this.selectedFormOperators.find((d) => d.index === i)?.operators || {};

    //Second - then we return the keys of operators object
    return Object.keys(operatorsObj);
  }

  //  To get the type of input.
  getInputType(i: number) {
    if (
      this.selectedFormOperators.find((d) => d.index === i)?.type ===
      constantsPropertyFields.DATE
    ) {
      return 'date';
    }
    return 'text';
  }

  // validation conditions
  validatorCondition(str: string, i: number) {
    const valControls = (this.mainForm.get('arr') as FormArray).controls[
      i
    ] as FormGroup;

    const valueControl = valControls.controls['value'];

    switch (str) {
      case validationsConst.TOUCHED:
        return valueControl.touched;
      case validationsConst.REQUIRED:
        return valueControl.errors?.['required'];
      case validationsConst.EMAIL:
        return valueControl.errors?.['email'];
      case validationsConst.NUMBER:
        return valueControl.errors?.['invalidNumber'];
      case validationsConst.MAX_LENGTH:
        return valueControl.errors?.['maxlength'];
      case validationsConst.MAX_DATE:
        return valueControl.errors?.['LessThanToday'];
      case validationsConst.SPACES_FRONT_AND_BACK:
        return valueControl.errors?.['spacesFrontAndBack'];
      case 'invalidSalary':
        return valueControl.errors?.['invalidSalary'];
      default:
        return false;
    }
  }

  //  to check whether to disable the property dropdown
  ifNameIsSelected(name: string | undefined) {
    if (name !== undefined) {
      return this.selectedFormOperators.find((data) => data.name === name);
    }
    return false;
  }

  // to delete a form group from array
  deleteFormGroup(index: number) {
    const formArray: any = this.mainForm.get('arr') as FormArray;
    this.selectedFormOperators = [
      ...this.selectedFormOperators.filter((data) => data.index != index),
    ];

    formArray.removeAt(index);
  }
  //  to check if name of criteria exists in criteria input
  criteriaCheck(event: any) {
    const toTest: string[] = [];
    this.propertyDataService.allRules.forEach((data: any) =>
      toTest.push(data.name)
    );
    if (toTest.find((data) => data === event.target.value)) {
      this.isCriteria = true;
    } else {
      this.isCriteria = false;
    }
  }
}
