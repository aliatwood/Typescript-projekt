import { Routes } from '@angular/router';
import { Kurser } from './sidor/kurser/kurser';
import { Ramschema } from './sidor/ramschema/ramschema';
import { Hem } from './sidor/hem/hem';

export const routes: Routes = [
  { path: '', redirectTo: 'hem', pathMatch: 'full' },
  { path: 'hem', component: Hem },
  { path: 'kurser', component: Kurser },
  { path: 'ramschema', component: Ramschema }
];