import { Routes } from '@angular/router';
import { PropertyRulesComponent } from './Components/property-rules/property-rules.component';

export const routes: Routes = [
  { path: '', redirectTo: 'property-rules', pathMatch: 'full' },
  { path: 'property-rules', component: PropertyRulesComponent },
];
