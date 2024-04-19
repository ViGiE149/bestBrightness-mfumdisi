import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-storeroom',
  templateUrl: './storeroom.page.html',
  styleUrls: ['./storeroom.page.scss'],
})
export class StoreroomPage implements OnInit {

  inventory: any[] = []; // Initialize here
  
  filteredInventory: any[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  selectedQuantityRange: string = '';

  isModalOpen = false;
  selectedImageUrl = '';
  modalTitle = '';

  constructor( private router: Router,private firestore: AngularFirestore) { }

  ngOnInit() {
    this.getInventory();
  }

  openModal(imageUrl: string, itemName: string) {
    this.selectedImageUrl = imageUrl;
    this.modalTitle = itemName;
    this.isModalOpen = true;
  }

  getInventory() {
    this.firestore.collection('storeroomInventory', ref => ref.orderBy('timestamp', 'desc')).valueChanges().subscribe((data: any[]) => {
      this.inventory = data;
      this.filterInventory();
    });
  }

  filterInventory() {
    this.filteredInventory = this.inventory.filter((item) =>
      (item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
      this.searchTerm === '') && 
      (this.selectedCategory === '' || item.category === this.selectedCategory) &&
      (this.selectedQuantityRange === '' || this.checkQuantityRange(item.quantity))
    );
  }

  goToUpdate(
    name: any,
    category: any,
    description: any,
    quantity: any,
    barcode: any,
    pickersDetails: any,
    dateOfPickup: any,
    timeOfPickup: any,
    imageUrl: any,
   
  ) {
    let navi: NavigationExtras = {
      state: {
        name: name,
        category: category,
        description: description,
        imageUrl: imageUrl || '',
        quantity: quantity,
        pickersDetails: pickersDetails,
        dateOfPickup: dateOfPickup,
        timeOfPickup: timeOfPickup,
        barcode: barcode || '',
        shop:"storeroom"
      },
    };
    this.router.navigate(['/update-storeroom'], navi);
  }

  deleteItem(item: any) {
    this.firestore.collection('storeroomInventory', ref => ref.where('barcode', '==', item.barcode)).get().subscribe(querySnapshot => {
      querySnapshot.forEach(doc => {
        // Delete the document
        this.firestore.collection('storeroomInventory').doc(doc.id).delete().then(() => {
          console.log(`Document with barcode ${item.barcode} deleted successfully`);
        }).catch(error => {
          console.error('Error deleting document:', error);
        });
      });
    });

  }


  checkQuantityRange(quantity: number): boolean {
    if (this.selectedQuantityRange === 'tooLow' && quantity <= 10) {
      return true;
    } else if (this.selectedQuantityRange === 'runningLow' && quantity >= 11 && quantity <= 20) {
      return true;
    } else if (this.selectedQuantityRange === 'middle' && quantity >= 21 && quantity <= 49) {
      return true;
    } else if (this.selectedQuantityRange === 'full' && quantity >= 50) {
      return true;
    } else {
      return false;
    }
  }
}
