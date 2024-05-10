import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SweetAlertMsgsService {
  //  to show sweet alert error message
  showSweetAlertError() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Fill the Form details correctly!!',
    });
  }

  // alert to show when fields doesnt match 
  showNoRulesMatchedAlert() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "Form details does'nt matches",
    });
  }
  constructor() {}
}
