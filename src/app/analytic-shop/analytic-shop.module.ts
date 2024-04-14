import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnalyticShopPageRoutingModule } from './analytic-shop-routing.module';

import { AnalyticShopPage } from './analytic-shop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnalyticShopPageRoutingModule
  ],
  declarations: [AnalyticShopPage]
})
export class AnalyticShopPageModule {}
