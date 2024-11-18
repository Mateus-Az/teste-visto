import { Routes } from '@angular/router';
import { PanelComponent } from './pages/panel/panel.component';
import { FormComponent } from './components/form/form.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/painel',
    pathMatch: 'full',
  },
  {
    path: 'painel',
    component: PanelComponent,
  },
  {
    path: 'products/form',
    component: FormComponent,
  },
  {
    path: 'products/edit/:id',
    component: FormComponent,
  },
  {
    path: '**',
    component: PanelComponent,
  },
];
