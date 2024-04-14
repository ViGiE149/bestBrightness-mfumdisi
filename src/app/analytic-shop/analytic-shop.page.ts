import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import Chart from 'chart.js/auto';

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
    this.getInventory();
   
   }

  ngOnInit() {
   
  
  }
  getInventory() {
    this.firestore.collection('inventory').valueChanges().subscribe((data: any[]) => {
      this.inventory = data;
      console.log(this.inventory)
      this.calculateUniqueBarcodesCount(this.inventory);
  
      this.showPieChat( this.inventory);
      this.generateLineChart(this.inventory);

      
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



showPieChat(inventory:any){
  console.log(this.inventory);
  const backgroundColor = this.inventory.map((data: any) => {
    if (data.quantity < 10) {
      return 'rgba(255, 0, 0, 0.6)'; // Red for quantity less than 10
    } else if (data.quantity < 15) {
      return 'rgba(255, 255, 0, 0.6)'; // Yellow for quantity less than 15
    } else {
      return 'rgba(0, 255, 0, 0.6)'; // Green for quantity above 20
    }
  });
  const ctx = document.getElementById('categoryComparisonChart') as HTMLCanvasElement;
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels:  inventory.map((data: any) => data.name),
      datasets: [
        {
          label: 'Inventory',
          data: inventory.map((data: any) => data.quantity),
          backgroundColor:  backgroundColor , 
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        // {
        //   label: 'Storeroom',
        //   data:  this.inventory.map((data: any) => data.quantity),
        //   backgroundColor: 'rgba(255, 99, 132, 0.2)',
        //   borderColor: 'rgba(255, 99, 132, 1)',
        //   borderWidth: 1,
        // },
      ],
    },
  });

}


generateLineChart(inventory: any) {
  const ctx = document.getElementById('quantityByCategoryChart') as HTMLCanvasElement;
  
  // Check if a chart already exists, and destroy it if it does
  const existingChart = Chart.getChart(ctx);
  if (existingChart) {
    existingChart.destroy();
  }

  const backgroundColor: string[] = [];
  const borderColor: string[] = [];

  inventory.forEach((data: any) => {
    const quantity = data.quantity;
    if (quantity < 10) {
      backgroundColor.push('rgba(255, 99, 132, 0.2)'); // Red color for low quantity
      borderColor.push('rgba(255, 99, 132, 1)');
    } else if (quantity < 20) {
      backgroundColor.push('rgba(255, 206, 86, 0.2)'); // Yellow color for medium quantity
      borderColor.push('rgba(255, 206, 86, 1)');
    } else {
      backgroundColor.push('rgba(75, 192, 192, 0.2)'); // Green color for high quantity
      borderColor.push('rgba(75, 192, 192, 1)');
    }
  });

  new Chart(ctx, {
    type: 'line', // Specify 'line' type for the chart
    data: {
      labels: inventory.map((data: any) => data.name),
      datasets: [
        {
          label: 'Quantity',
          data: inventory.map((data: any) => data.quantity),
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}



}
