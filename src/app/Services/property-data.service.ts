import { Injectable } from '@angular/core';
import { properties } from '../Interfaces/Operators.interface';
import { Observable, of } from 'rxjs';
import { constantsPropertyFields } from '../Common/allConstants';

@Injectable({
  providedIn: 'root',
})
export class PropertyDataService {
  //  properties with name, id and their active status
  properties: properties[] = [
    {
      id: 1,
      name: 'name',
      type: constantsPropertyFields.TEXT,
      active: true,
      operators: {
        startsWith: true,
        endsWith: true,
        includes: true,
        status: true,
      },
    },
    {
      id: 2,
      name: 'email',
      type: constantsPropertyFields.EMAIL,
      active: true,
      operators: {
        startsWith: true,
        endsWith: true,
        includes: true,
        domainName: true,
        status: true,
      },
    },
    {
      id: 3,
      name: 'phone number',
      type: constantsPropertyFields.NUMBER,
      active: true,
      operators: {
        usa: true,
        india: true,
        startsWith: true,
        includes: true,
        status: true,
      },
    },
    {
      id: 4,
      name: 'Date',
      type: constantsPropertyFields.DATE,
      active: true,
      operators: {
        status: true,
        beforeDate: true,
        afterDate: true,
      },
    },
    {
      id: 5,
      name: 'Salary',
      type: constantsPropertyFields.NUMBER,
      active: true,
      operators: {
        status: true,
        lessThan: true,
        greaterThan: true,
        equalsTo: true,
      },
    },
    {
      id: 6,
      name: 'User Id',
      type: constantsPropertyFields.NUMBER,
      active: true,
      operators: {
        status: true,
        startsWith: true,
        endsWith: true,
      },
    },
  ];

  getProperties(): Observable<properties[]> {
    return of(this.properties);
  }

  constructor() {}
}
