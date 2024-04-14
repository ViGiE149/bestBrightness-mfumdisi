import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-analytic-store',
  templateUrl: './analytic-store.page.html',
  styleUrls: ['./analytic-store.page.scss'],
})
export class AnalyticStorePage implements OnInit {
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
      this.generatePieChart(this.inventory);
  
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


  generatePieChart(inventory:any) {
  
    const ctx = document.getElementById('quantityByCategoryChartx') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: inventory.map((data: any) => data.name),
        datasets: [
          {
            label: 'Quantity',
            data: inventory.map((data: any) => data.quantity),
            // backgroundColor: (context) => {
            //  // const index = context.dataIndex;
            //   ///const category = uniqueCategories[index];
            //  // return lowQuantityCategories.includes(category)
            //     ? 'rgba(255, 99, 132, 0.2)' // Red color for low quantity
            //     : 'rgba(75, 192, 192, 0.2)'; // Default color
            // },
           // borderColor: (context) => {
            //   const index = context.dataIndex;
            //   const category = uniqueCategories[index];
            //   return lowQuantityCategories.includes(category)
            //     ? 'rgba(255, 99, 132, 1)' // Red color for low quantity
            //     : 'rgba(75, 192, 192, 1)'; // Default color
            // },
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



generateLineChart(inventory: any) {
  const ctx = document.getElementById('categoryComparisonCharttx') as HTMLCanvasElement;
  
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

