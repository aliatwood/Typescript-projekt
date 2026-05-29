import { Routes } from '@angular/router';
import { Kurser } from './sidor/kurser/kurser';
import { Ramschema } from './sidor/ramschema/ramschema';

export const routes: Routes = [
  { path: '', redirectTo: 'kurser', pathMatch: 'full' },
  { path: 'kurser', component: Kurser },
  { path: 'ramschema', component: Ramschema }
];