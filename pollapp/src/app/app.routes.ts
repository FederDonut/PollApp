import { Routes } from '@angular/router';
import { Landingpage } from './shared/component/landingpage/landingpage';
import { Survey } from './shared/component/survey/survey';

export const routes: Routes = [
  {
    path: '',
    component: Landingpage,
  },
  {
    path: 'survey',
    component: Survey,
  },
];
