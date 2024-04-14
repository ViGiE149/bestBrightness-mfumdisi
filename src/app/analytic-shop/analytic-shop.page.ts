import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-analytic-shop',
  templateUrl: './analytic-shop.page.html',
  styleUrls: ['./analytic-shop.page.scss'],
})
export class AnalyticShopPage implements OnInit {
  inventory: any[]=[];
  uniqueBarcodesCount: number=0;
  users: any[]=[];
  inventoryByCategory: Map<string, number> = new Map();

  constructor(private firestore:AngularFirestore) {
    this.getInventory()

   }

  ngOnInit() {
  }
  getInventory() {
    this.firestore.collection('inventory').valueChanges().subscribe((data: any[]) => {
      this.inventory = data;
      this.calculateUniqueBarcodesCount(this.inventory);
      
  this.aggregateInventoryByCategory(data) 
    });
  }

  calculateUniqueBarcodesCount(data:any) {
    const uniqueBarcodes = new Set<string>();
    data.forEach((item :any) => {
      uniqueBarcodes.add(item.barcode);
    });
    this.uniqueBarcodesCount = uniqueBarcodes.size;
  }
  getUsers() {
    this.firestore.collection('Users').valueChanges().subscribe((data: any[]) => {
      this.users = data;
      this.calculateUniqueBarcodesCount(this.users);
    });
  }

  aggregateInventoryByCategory(inventory: any[]) {
    this.inventoryByCategory.clear();
    inventory.forEach(item => {
      const category = item.category;
      const quantity = item.quantity;
      if (this.inventoryByCategory.has(category)) {
        const currentQuantity = this.inventoryByCategory.get(category);
        this.inventoryByCategory.set(category, currentQuantity + quantity);
      } else {
        this.inventoryByCategory.set(category, quantity);
      }
    });
  }

}
