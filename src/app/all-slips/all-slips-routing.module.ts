import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllSlipsPage } from './all-slips.page';

const routes: Routes = [
  {
    path: '',
    component: AllSlipsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllSlipsPageRoutingModule {}
