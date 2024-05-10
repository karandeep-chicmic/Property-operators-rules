import { Component, inject, OnInit } from '@angular/core';
import { PropertyDataService } from '../../Services/property-data.service';
import {
  criteria,
  criteriaSatisfies,
  rules,
  userData,
} from '../../Interfaces/Operators.interface';
import { CommonModule, JsonPipe } from '@angular/common';
import { SweetAlertMsgsService } from '../../Services/sweet-alert-msgs.service';
import { ToMatchDataService } from '../../Services/to-match-data.service';
import { OperatorFunctionService } from '../../Services/operator-function.service';

@Component({
  selector: 'app-display-rules',
  standalone: true,
  imports: [JsonPipe, CommonModule],
  templateUrl: './display-rules.component.html',
  styleUrl: './display-rules.component.css',
})
export class DisplayRulesComponent implements OnInit {
  propertyData = inject(PropertyDataService);
  sweetAlertMsgs = inject(SweetAlertMsgsService);
  toMatchData = inject(ToMatchDataService);
  operatorsFunctions = inject(OperatorFunctionService);

  rules: criteria[] = [];
  toMatchUsers: userData[] = [];
  criteriaSatisfies: criteriaSatisfies[] = [];

  ngOnInit(): void {
    this.rules = this.propertyData.allRules;
    this.toMatchUsers = this.toMatchData.userData;
    this.criteriaSatisfies = this.toMatchData.initializesArr();

    this.matchRulesWithUser();

    console.log(this.criteriaSatisfies);
  }

  // To match all the rules on basis of given data
  matchRulesWithUser() {
    // Iterating every user in userData Array
    this.toMatchUsers.forEach((data) => {
      // called a function for checking rules and passed each user as a param
      this.checkRule(data);
    });
  }

  checkRule(data: userData) {
    this.rules.forEach((criteria) => {
      // criterias one by one check user fields

      let flag = true;
      criteria.rules?.forEach((rulesData) => {
        const property = rulesData.property;
        const operator = rulesData.operators;
        const value = rulesData.value;

        // data.name
        if (property === 'name') {
          if (operator === 'startsWith') {
            flag =
              flag &&
              this.operatorsFunctions.startsWith(
                String(data.name),
                String(value)
              );
          } else if (operator === 'endsWith') {
            flag =
              flag &&
              this.operatorsFunctions.endsWith(
                String(data.name),
                String(value)
              );
          } else if (operator === 'includes') {
            flag =
              flag &&
              this.operatorsFunctions.includes(
                String(data.name),
                String(value)
              );
          }
        }
        // data.email
        if (property === 'email') {
          if (operator === 'startsWith') {
            flag =
              flag &&
              this.operatorsFunctions.startsWith(
                String(data.email),
                String(value)
              );
          } else if (operator === 'endsWith') {
            flag =
              flag &&
              this.operatorsFunctions.endsWith(
                String(data.email),
                String(value)
              );
          } else if (operator === 'includes') {
            flag =
              flag &&
              this.operatorsFunctions.includes(
                String(data.email),
                String(value)
              );
          } else if (operator === 'domain') {
            flag =
              flag &&
              this.operatorsFunctions.domainName(
                String(data.email),
                String(value)
              );
          }
        }

        // data.date
        if (property === 'Date') {
          if (operator === 'beforeDate') {
            flag =
              flag &&
              this.operatorsFunctions.beforeDate(
                String(data.date),
                String(value)
              );
          } else if (operator === 'afterDate') {
            flag =
              flag &&
              this.operatorsFunctions.afterDate(
                String(data.date),
                String(value)
              );
          }
        }

        // data.phone_number
        if (property === 'phone number') {
          if (operator === 'startsWith') {
            flag =
              flag &&
              this.operatorsFunctions.startsWith(
                String(data.phone_number),
                String(value)
              );
          } else if (operator === 'includes') {
            flag =
              flag &&
              this.operatorsFunctions.includes(
                String(data.phone_number),
                String(value)
              );
          }
        }

        // data.salary
        if (property === 'Salary') {
          if (operator === 'lessThan') {
            flag =
              flag &&
              this.operatorsFunctions.lessThan(
                String(data.salary),
                String(value)
              );
          } else if (operator === 'greaterThan') {
            flag =
              flag &&
              this.operatorsFunctions.greaterThan(
                String(data.salary),
                String(value)
              );
          } else if (operator === 'equalsTo') {
          }
        }

        // data.userId
        if (property === 'User Id') {
          if (operator === 'startsWith') {
            flag =
              flag &&
              this.operatorsFunctions.startsWith(
                String(data.userId),
                String(value)
              );
          } else if (operator === 'endsWith') {
            flag =
              flag &&
              this.operatorsFunctions.endsWith(
                String(data.userId),
                String(value)
              );
          }
        }
      });
      if (flag === true) {
        const temp: string = criteria.name || '';
        const userName: string = data.name || '';

        const index: number = this.criteriaSatisfies.findIndex((data) => {
          return data.fieldName === userName;
        });
        console.log(index);

        this.criteriaSatisfies[index]?.criteria?.push(temp);
      }
      //   // rules one by one
    });
  }
}
