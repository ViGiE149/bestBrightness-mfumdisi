import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreroomDeshboardPageRoutingModule } from './storeroom-deshboard-routing.module';

import { StoreroomDeshboardPage } from './storeroom-deshboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreroomDeshboardPageRoutingModule
  ],
  declarations: [StoreroomDeshboardPage]
})
export class StoreroomDeshboardPageModule {}
