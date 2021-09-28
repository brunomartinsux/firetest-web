import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page.component';
import { ComponentsModule } from '../components/components.module';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ChangePasswordComponent } from './change-password/change-password.component';




 const routes: Routes = [
   { path: '', component: LoginPageComponent },
   { path: 'recover-password', component: RecoverPasswordComponent},
   { path: 'register', component: RegisterPageComponent},
   { path: 'change-password/:id', component: ChangePasswordComponent }

  ]
@NgModule({
  declarations: [
    LoginPageComponent,
    RecoverPasswordComponent,
    RegisterPageComponent,
    ChangePasswordComponent
  ],
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  exports: [RouterModule],
})
export class LoginModule {}
