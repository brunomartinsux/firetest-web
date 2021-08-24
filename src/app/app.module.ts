import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HomePageComponent } from './home-page/home-page.component';
import { ComponentsModule } from './components/components.module';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login-page/login.module').then((m) => m.LoginModule),
  },
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'home', component: HomePageComponent
  }
];

@NgModule({
  declarations: [AppComponent, HomePageComponent],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ComponentsModule
    
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
