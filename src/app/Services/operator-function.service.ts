import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OperatorFunctionService {
  startsWith(value: string, search: string): boolean {
    return value.startsWith(search);
  }
  endsWith(value: string, search: string) {
    return value.endsWith(search);
  }
  includes(value: string, search: string) {
    return value.includes(search);
  }
  domainName(value: string, search: string) {
    const arr = value.split('@');
    return arr[1].includes(search);
  }
  lessThan(value: string, search: string) {
    return value < search;
  }
  greaterThan(value: string, search: string) {
    return value > search;
  }
  equalsTo(value: string, search: string) {
    return value === search;
  }
  beforeDate(value: string, before: string) {
    let date = new Date(value);
    let today = new Date(before);
    return date < today;
  }
  afterDate(value: string, after : string) {
    let date = new Date(value);
    let today = new Date(after);
    return date > today;
  }
}
