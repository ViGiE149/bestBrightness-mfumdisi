import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreroomDeshboardPage } from './storeroom-deshboard.page';

const routes: Routes = [
  {
    path: '',
    component: StoreroomDeshboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreroomDeshboardPageRoutingModule {}
