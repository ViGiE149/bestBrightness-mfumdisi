import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'reset',
    loadChildren: () => import('./reset/reset.module').then( m => m.ResetPageModule)
  },
  {
    path: 'inventory',
    loadChildren: () => import('./inventory/inventory.module').then( m => m.InventoryPageModule)
  },
  {
    path: 'analytics',
    loadChildren: () => import('./analytics/analytics.module').then( m => m.AnalyticsPageModule)
  },
  {
    path: 'add-inventory',
    loadChildren: () => import('./add-inventory/add-inventory.module').then( m => m.AddInventoryPageModule)
  },
  {
    path: 'update',
    loadChildren: () => import('./update/update.module').then( m => m.UpdatePageModule)
  },
  {
    path: 'add-inventory-storeroom',
    loadChildren: () => import('./storerom pages/add-inventory-storeroom/add-inventory-storeroom.module').then( m => m.AddInventoryStoreroomPageModule)
  },
  {
    path: 'user-profiles',
    loadChildren: () => import('./user-profiles/user-profiles.module').then( m => m.UserProfilesPageModule)
  },
  {
    path: 'pickup',
    loadChildren: () => import('./pickup/pickup.module').then( m => m.PickupPageModule)
  },
  {
    path: 'delivery',
    loadChildren: () => import('./delivery/delivery.module').then( m => m.DeliveryPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'view',
    loadChildren: () => import('./view/view.module').then( m => m.ViewPageModule)
  },
  {
    path: 'storeroom',
    loadChildren: () => import('./storerom pages/storeroom/storeroom.module').then( m => m.StoreroomPageModule)
  },
 
  {
    path: 'choose',
    loadChildren: () => import('./choose/choose.module').then( m => m.ChoosePageModule)
  },
  {
    path: 'storeroom-deshboard',
    loadChildren: () => import('./storerom pages/storeroom-deshboard/storeroom-deshboard.module').then( m => m.StoreroomDeshboardPageModule)
  },
  {
    path: 'analytic-store',
    loadChildren: () => import('./storerom pages/analytic-store/analytic-store.module').then( m => m.AnalyticStorePageModule)
  },
  {
    path: 'analytic-shop',
    loadChildren: () => import('./analytic-shop/analytic-shop.module').then( m => m.AnalyticShopPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
