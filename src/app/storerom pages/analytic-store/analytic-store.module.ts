import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnalyticStorePageRoutingModule } from './analytic-store-routing.module';

import { AnalyticStorePage } from './analytic-store.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnalyticStorePageRoutingModule
  ],
  declarations: [AnalyticStorePage]
})
export class AnalyticStorePageModule {}
