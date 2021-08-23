import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page.component';
import { ComponentsModule } from '../components/components.module';



 const routes: Routes = [
   { path: '', component: LoginPageComponent }
  ]

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class LoginModule {}
