import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'
const routes: Routes = [{
  path: '', children: [
    { path: '', redirectTo: '/register', pathMatch: 'full' },
    {
      path: 'register', component: RegisterComponent
    },
    {
      path: 'login', component: LoginComponent
    }
  ]
}];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
    CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
