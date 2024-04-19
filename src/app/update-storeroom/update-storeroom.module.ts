import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateStoreroomPageRoutingModule } from './update-storeroom-routing.module';

import { UpdateStoreroomPage } from './update-storeroom.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateStoreroomPageRoutingModule
  ],
  declarations: [UpdateStoreroomPage]
})
export class UpdateStoreroomPageModule {}
