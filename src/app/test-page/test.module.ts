import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';

import { TestPageComponent } from './test-page.component';
import { TestMenuComponent } from './test-menu/test-menu.component';
import { TestBuildComponent } from './test-build/test-build.component';
import { TestDisplayComponent } from './test-display/test-display.component';

const routes: Routes = [
  {
    path: '',
    component: TestPageComponent,
    children: [
      { path: '', component: TestMenuComponent },
      { path: 'build-test', component: TestBuildComponent },
      { path: 'test-display', component: TestDisplayComponent }
    ],
  },
];

@NgModule({
  declarations: [TestPageComponent, TestMenuComponent, TestBuildComponent, TestDisplayComponent],
  imports: [ComponentsModule, CommonModule, FormsModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestModule {}
