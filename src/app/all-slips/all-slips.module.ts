import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllSlipsPageRoutingModule } from './all-slips-routing.module';

import { AllSlipsPage } from './all-slips.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllSlipsPageRoutingModule
  ],
  declarations: [AllSlipsPage]
})
export class AllSlipsPageModule {}
