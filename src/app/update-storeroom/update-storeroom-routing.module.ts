import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateStoreroomPage } from './update-storeroom.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateStoreroomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateStoreroomPageRoutingModule {}
