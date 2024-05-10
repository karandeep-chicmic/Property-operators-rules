import { Injectable } from '@angular/core';
import { criteriaSatisfies, userData } from '../Interfaces/Operators.interface';

@Injectable({
  providedIn: 'root',
})
export class ToMatchDataService {
  userData: userData[] = [
    {
      id: 1,
      userId: 121,
      name: 'karan',
      email: 'john.c.calhoun@petstore.com',
      phone_number: 9017344449,
      date: '2002-01-13',
      salary: 100000,
    },
    {
      id: 2,
      userId: 122,
      name: 'Alice',
      email: 'alice@example.com',
      phone_number: 1234567890,
      date: '1995-05-25',
      salary: 85000,
    },
    {
      id: 3,
      userId: 123,
      name: 'Bob',
      email: 'bob@example.com',
      phone_number: 9876543210,
      date: '1988-11-12',
      salary: 95000,
    },
    {
      id: 4,
      userId: 124,
      name: 'Eve',
      email: 'eve@example.com',
      phone_number: 5555555555,
      date: '1990-09-30',
      salary: 110000,
    },
  ];

  //  To initialize the array with satisfied criteria in form of criteriaSatisfies[]
  initializesArr(): criteriaSatisfies[] {
    const arr: criteriaSatisfies[] = [];
    this.userData.forEach((data) => {
      const obj: criteriaSatisfies = {
        id: data.id,
        fieldName: data.name || '',
        criteria: [],
      };
      arr.push(obj);
    });
    console.log(arr);
    return arr;
  }
  constructor() {}
}
