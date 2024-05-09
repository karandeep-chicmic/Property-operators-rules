import { Component, inject, OnInit } from '@angular/core';
import { operators, properties } from '../../Interfaces/Operators.interface';
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
import Swal from 'sweetalert2';
import {
  constantsPropertyFields,
  validationsConst,
} from '../../Common/allConstants';

@Component({
  selector: 'app-property-rules',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './property-rules.component.html',
  styleUrl: './property-rules.component.css',
})
export class PropertyRulesComponent implements OnInit {
  // All the imported services
  propertyDataService = inject(PropertyDataService);
  formBuilder = inject(FormBuilder);
  requiredFunctions = inject(RequiredFunctionsService);

  // All the variables And Reactive form
  mainForm!: FormGroup;
  form!: FormGroup;
  propertyData: properties[] = [];
  operators: string[] = [];
  selectedProperty: properties[] = [];
  inputType: string = constantsPropertyFields.TEXT;

  // for getting selected operator and index associated with the property of form-array element
  selectedFormOperators: {
    index?: number;
    type?: string;
    operators?: operators | undefined;
    name?: string; // to store the name of selected property
  }[] = [];

  //Constructor and Lifecycle Hooks
  constructor() {
    this.form = this.formBuilder.group({
      property: ['', Validators.required],
      operators: ['', Validators.required],
      value: ['', Validators.required],
    });

    this.mainForm = this.formBuilder.group({
      arr: this.formBuilder.array([this.form]),
    });
  }
  ngOnInit(): void {
    this.propertyDataService.getProperties().subscribe((data) => {
      this.propertyData = data;
    });
  }

  //All the Methods of the Class Are as below.
  addRule() {
    if (this.mainForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill the Form details correctly!!',
      });
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
    console.log(this.mainForm.value);
  }

  // to get controls of formgroups in form array
  getControls() {
    return (this.mainForm.get('arr') as FormArray)?.controls;
  }

  //  on changing of property dropdown updates the operators array
  propertyChange(event: any, i: number) {
    const name: string = String(event.target.value);

    // first - we remove the operators from the selectedFormOperators
    this.selectedFormOperators = [
      ...this.selectedFormOperators.filter((data) => {
        if (data.index == i) {
          return false;
        }
        return true;
      }),
    ];
    // Variable to store property selected

    // Variable to store property selected
    const getProperty: properties =
      this.propertyData.find((data) => {
        if (data.name == name) {
          return true;
        }
        return false;
      }) || {};

    // second - then we push the operators with associated index to selectedFormOperators
    this.selectedFormOperators.push({
      index: i,
      type: getProperty?.type,
      operators: getProperty?.operators,
      name: name,
    });

    // Third - To remove previous validators
    this.requiredFunctions.removeValidators(this.mainForm, i);

    // Fourth - then we set the validators to the form control
    this.requiredFunctions.setFormValidators(
      this.mainForm,
      this.selectedFormOperators[i].type || 'text',
      i
    );

    // Fifth - set the value input field empty
    (
      (this.mainForm?.get('arr') as FormArray).controls[i] as FormGroup
    ).controls['value'].setValue('');
  }

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

  validatorCondition(str: string, i: number) {
    const valControls = (this.mainForm.get('arr') as FormArray).controls[
      i
    ] as FormGroup;

    if (str === validationsConst.TOUCHED) {
      return valControls.controls['value'].touched;
    }
    if (str === validationsConst.REQUIRED) {
      return valControls.controls['value'].errors?.['required'];
    } else if (str === validationsConst.EMAIL) {
      return valControls.controls['value'].errors?.['email'];
    } else if (str === validationsConst.NUMBER) {
      return valControls.controls['value'].errors?.['invalidNumber'];
    } else if (
      str === validationsConst.MAX_LENGTH &&
      valControls.controls['property'].value === validationsConst.PHONE_NUMBER
    ) {
      return valControls.controls['value'].errors?.['maxlength'];
    }else if(str=== validationsConst.MAX_DATE){
      return valControls.controls['value'].errors?.['LessThanToday']
    }
    return false;
  }

  //  to check whether to disable the property dropdown
  ifNameIsSelected(name: string | undefined) {
    if (name !== undefined) {
      return this.selectedFormOperators.find((data) => data.name === name);
    }
    return false;
  }
}
