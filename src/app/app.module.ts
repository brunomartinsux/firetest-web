import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HomePageComponent } from './home-page/home-page.component';
import { ComponentsModule } from './components/components.module';
import { ProfilePageComponent } from './profile-page/profile-page.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login-page/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'test',
    loadChildren: () => import('./test-page/test.module').then((m) => m.TestModule)
  },
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'home', component: HomePageComponent
  },
  {
    path: 'profile', component: ProfilePageComponent
  }
];

@NgModule({
  declarations: [AppComponent, HomePageComponent, ProfilePageComponent],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ComponentsModule,
    ReactiveFormsModule
  ],

  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule {}
