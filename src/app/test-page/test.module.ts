import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';

import { TestPageComponent } from './test-page.component';
import { TestMenuComponent } from './test-menu/test-menu.component';

const routes: Routes = [{ path: '', component: TestPageComponent, children: [
    { path: 'menu', component: TestMenuComponent }
] }];

@NgModule({
  declarations: [TestPageComponent, TestMenuComponent],
  imports: [ComponentsModule, CommonModule, FormsModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestModule {}
