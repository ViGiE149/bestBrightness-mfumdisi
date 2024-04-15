import { Component, OnInit, Renderer2 } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { finalize } from 'rxjs/operators';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {
  AlertController,
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { debounceTime } from 'rxjs/operators';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Browser } from '@capacitor/browser';

import * as pdfFonts from 'pdfmake/build/vfs_fonts';
const pdfMake = require('pdfmake/build/pdfmake.js');

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.page.html',
  styleUrls: ['./add-inventory.page.scss'],
})
export class AddInventoryPage implements OnInit {
  itemName: string = '';
  itemCategory: string = '';
  itemDescription: string = '';
  itemQuantity = 0;
  pickersDetails: string = '';
  dateOfPickup: string = '';
  timeOfPickup: string = '';
  barcode: string = '';
  imageBase64: any;
  imageUrl: string | null = null;
  cart: any[] = [];
  qrCodeIdentifire: any;
  currentDate: Date;
  currentTime: string;

  // Variable to hold the barcode value
  toggleChecked: boolean = false;
  inventoryItems: any;;

  constructor(
    private renderer: Renderer2,
    private modalController: ModalController,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private loadingController: LoadingController,
    private ToastController: ToastController,
    private alertController: AlertController
  ) {
    this.currentDate = new Date();
    this.currentTime = this.currentDate.toLocaleTimeString("en-US", {
      hour12: false,
    });
  
  }

  ngOnInit() {
    document.querySelector('body')?.classList.remove('scanner-active'); 
  }
  
  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    });
    this.imageBase64 = image.base64String;
  }

  async uploadImage(file: string) {
    const fileName = Date.now().toString();
    const filePath = `images/${fileName}`;
    const fileRef = this.storage.ref(filePath);
    const uploadTask = fileRef.putString(file, 'base64', {
      contentType: 'image/jpeg',
    });
    const snapshot = await uploadTask;
    return snapshot.ref.getDownloadURL();
  }

 
  
  async searchProductByBarcode() {
    if (this.barcode.trim() === '') {
      // If the barcode input is empty, clear other input fields
      this.clearFieldsExceptBarcode();
      return;
    }
  
    // Search for the product with the entered barcode in Firestore
    const querySnapshot = await this.firestore
      .collection('storeroomInventory')
      .ref.where('barcode', '==', this.barcode.trim())
      .limit(1)
      .get();
  
    if (!querySnapshot.empty) {
      // If a product with the entered barcode is found, populate the input fields
      const productData:any = querySnapshot.docs[0].data();
      this.itemName = productData.name;
      this.itemCategory = productData.category;
      this.itemDescription = productData.description;
      // You can similarly populate other input fields here
    } else {
      // If no product with the entered barcode is found, clear other input fields
      this.clearFieldsExceptBarcode();
      this.presentToast('Product not found', 'warning');
    }
  }
  
  clearFieldsExceptBarcode() {
    // Clear all input fields except the barcode input
    this.itemName = '';
    this.itemCategory = '';
    this.itemDescription = '';
    // Clear other input fields here
  }
  


  async closeScanner(){
    const result = await BarcodeScanner.stopScan(); // start scanning and wait for a result
    // if the result has content
  
    
    this.showCard();
    window.document.querySelector('ion-app')?.classList.remove('cameraView');
    document.querySelector('body')?.classList.remove('scanner-active');
  }

  hideCard() {
    const cardElement = document.getElementById('container');
    if (cardElement) {
      this.renderer.setStyle(cardElement, 'display', 'none'); // Use Renderer2's setStyle()
    }
  }
showCard() {
    const cardElement = document.getElementById('container');
    if (cardElement) {
      this.renderer.setStyle(cardElement, 'display', 'contents'); // Use Renderer2's setStyle()
    }
  }
  async scanBarcode() {
 
    window.document.querySelector('ion-app')?.classList.add('cameraView');
    this.hideCard();
    document.querySelector('body')?.classList.add('scanner-active');
    await BarcodeScanner.checkPermission({ force: true });
    // make background of WebView transparent
    // note: if you are using ionic this might not be enough, check below
    //BarcodeScanner.hideBackground();
    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
    // if the result has content
    if (result.hasContent) {
      this.barcode = result.content;
      console.log(result.content);
      
      this.showCard();
      
      const querySnapshot = await this.firestore
      .collection('storeroomInventory')
      .ref.where('barcode', '==', result.content)
      .limit(1)
      .get();
      window.document.querySelector('ion-app')?.classList.remove('cameraView');
      document.querySelector('body')?.classList.remove('scanner-active');
    if (!querySnapshot.empty) {
      // If a product with the same barcode is found, populate the input fields
      
      const productData:any = querySnapshot.docs[0].data();
      this.itemName = productData.name;
      this.itemCategory = productData.category;
      this.itemDescription = productData.description;
   
      // You can similarly populate other input fields here
    } else {
      this.presentToast('Product not found', 'warning');
    }// log the raw scanned content
      window.document.querySelector('ion-app')?.classList.remove('cameraView');
    }
  }


  
  toggleMode() {
    if (this.toggleChecked) {
      this.barcode = ''; // Clear the barcode value when switching to input mode
      BarcodeScanner.showBackground();
  BarcodeScanner.stopScan();
  document.querySelector('body')?.classList.remove('scanner-active');
    }
  }
  checkBookingDateTime(date: any, startTime: any): void {
    // Check if the date is in the past
    if (date >= this.currentDate.toISOString().split("T")[0]) {
      this.presentToast("date must be behind or must be current date.","warning");
      return;
    }
  
    if (!this.imageBase64){
      this.presentToast("Capture the image of the product","warning");
      return;
    }
  
    // Check if the time is in the past
  }
  async addItem() {
    let itemQuantity = 0;
    this.checkBookingDateTime(this.currentDate,this.currentTime);
    const loader = await this.loadingController.create({
      message: 'Adding Inventory...',
    });
    await loader.present();

    try {
      if (this.imageBase64) {
        this.imageUrl = await this.uploadImage(this.imageBase64);
      }
      const userEmail = await this.firestore
        .collection('Users')
        .ref.where('email', '==', this.pickersDetails)
        .get();
      console.log(userEmail);
      if (userEmail.empty) {
        this.presentToast('this delivery guy is not no our system',"warning");
        console.log('this delivary guy is not no our system');
        return;
      }

      // Check if there is an existing item with the same barcode in the storeroomInventory collection
      const existingItemQuery = await this.firestore
        .collection('storeroomInventory')
        .ref.where('barcode', '==', this.barcode)
        .get();
      if (!existingItemQuery.empty) {
        // Update the quantity of the existing item in the storeroomInventory collection
        const existingItemDoc = existingItemQuery.docs[0];
        const existingItemData: any = existingItemDoc.data();
        if (existingItemData.quantity < this.itemQuantity) {
          // Show an alert if the stock is insufficient
          this.presentToast(
            'Insufficient Stock, The stock for this item is insufficient. the are ' +
              existingItemData.quantity +
              ' available',"warning"
          );
          return;
        }
        const updatedQuantity = existingItemData.quantity - this.itemQuantity;
        console.log(existingItemData.quantity);
        console.log(updatedQuantity);
        itemQuantity = existingItemData.quantity;

        await existingItemDoc.ref.update({ quantity: updatedQuantity });
        console.log('Storeroom Inventory Updated (Minused)');
      } else {
        this.presentToast(
          'this product barcode does  not metch any on our storeroom',"warning"
        );
        return;
      }
      ///////////////////////////////////////
      // Check if there's an existing item with the same name in the inventory collection
      const existingItemQueryStore = await this.firestore
        .collection('inventory')
        .ref.where('barcode', '==', this.barcode)
        .get();
      if (!existingItemQueryStore.empty) {
        // Update the quantity of the existing item in the storeroomInventory collection
        const existingItemDoc = existingItemQuery.docs[0];
        const existingItemData: any = existingItemDoc.data();
        const updatedQuantity = existingItemData.quantity + this.itemQuantity;
        this.itemQuantity += updatedQuantity;
        await existingItemDoc.ref.update({ quantity: updatedQuantity });
        console.log('Storeroom Inventory Updated (Plused)');
        return;
      }

      const newItem = {
        name: this.itemName,
        category: this.itemCategory,
        description: this.itemDescription,
        imageUrl: this.imageUrl || '',
        quantity: this.itemQuantity,
        pickersDetails: this.pickersDetails,
        dateOfPickup: this.dateOfPickup,
        timeOfPickup: this.timeOfPickup,
        barcode: this.barcode || '',
        timestamp: new Date(),
      };
      this.cart.push(newItem);

      this.presentToast('Item added to cart',"successfull");
      await this.firestore.collection('inventory').add(newItem);
      this.clearFields();
    } catch (error) {
      console.error('Error adding inventory:', error);
      // Handle error
    } finally {
      loader.dismiss();
    }
  }

  async generateSlip() {
    const loader = await this.loadingController.create({
      message: 'Generating Slip...',
    });
    await loader.present();
  console.log("data",this.cart)
    try {
      // Create a slip document in Firestore
      const slipData = {
        date: new Date(),
        items: this.cart.map(item => ({
          name: item.name,
          quantity: item.quantity,
          category: item.category,
          description: item.description,
          imageUrl: item.imageUrl,
          pickersDetails: item.pickersDetails,
          dateOfPickup: item.dateOfPickup,
          timeOfPickup: item.timeOfPickup,
          barcode: item.barcode,
        })),
      };
      await this.firestore.collection('slips').add(slipData);
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
     // Calculate column widths based on content length


// Define PDF content
// Define PDF content
// Define PDF content
const docDefinition = {
  content: [
    {
      text: 'BEST BRIGHT', // Adding the pickersDetailsPhone name to the header
      style: 'companyName'
    },
    {
      text: 'Invoice',
      style: 'header'
    },
    {
      text: `Date: ${new Date().toLocaleDateString()}`,
      style: 'subheader'
    },
    {
      table: {
        headerRows: 1,
        widths: [ '*', '*', '*', '*', '*', '*' ],
        body: [
          [
            { text: 'Name', style: 'tableHeader' },
            { text: 'Category', style: 'tableHeader' },
            { text: 'Description', style: 'tableHeader' },
            { text: 'Quantity', style: 'tableHeader' },
            { text: 'Picker\'s Details', style: 'tableHeader' },
            { text: 'Barcode', style: 'tableHeader' }
          ],
          ...this.cart.map(item => [
            { text: item.name, alignment: 'left' }, // Align left
            { text: item.category, alignment: 'center' }, // Align center
            { text: item.description, alignment: 'left' }, // Align left
            { text: item.quantity.toString(), alignment: 'center' }, // Align center
            { text: item.pickersDetails, alignment: 'left' }, // Align left
            { text: item.barcode, alignment: 'center' } // Align center
          ])
        ]
      }
    }
  ],
  styles: {
    header: {
      fontSize: 24,
      bold: true,
      margin: [0, 0, 0, 10],
      alignment: 'center',
      color: '#4caf50' // Green color for the header
    },
    subheader: {
      fontSize: 14,
      bold: true,
      margin: [0, 10, 0, 10],
      alignment: 'center'
    },
    tableHeader: {
      bold: true,
      fontSize: 12,
      color: '#37474f', // Dark grey color for the table headers
      alignment: 'center'
    },
    companyName: { // Style for the company name
      fontSize: 28,
      bold: true,
      margin: [0, 0, 0, 20], // Adjust margin to separate company name from header
      alignment: 'center',
      color: '#ff5722' // Deep orange color for the company name
    }
  }
};





    // Generate PDF
    //pdfMake.createPdf(docDefinition).open();
    // const pdfDocGenerator = await pdfMake.createPdf(docDefinition);
    // const pdfData = await pdfDocGenerator.getBase64();
    // await this.savePDFLocally(pdfData);
    //   // Clear the cart after generating the slip
    //   pdfDocGenerator.open();
    //   this.cart = [];
  
    //   // Show success toast notification
    //   this.presentToast('Slip generated successfully',"success");
    // } catch (error) {
    //   console.error('Error generating slip:', error);
    //   // Handle error
    // } finally {
    //   loader.dismiss();
    // }
   
    


    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.getBase64(async (pdfData: string) => {
      try {
        // Save the PDF locally
        await this.savePDFLocally(pdfData);
    
        // Open the generated PDF
       // pdfDocGenerator.open();
    
        // Clear the cart after generating the slip
       //this.cart = [];
    
        // Show success toast notification
        this.presentToast('Slip generated successfully', "success");
      } catch (error) {
        console.error('Error generating slip:', error);
        // Handle error
      } finally {
        loader.dismiss();
      }
    });
   } catch (error) {
      console.error('Error generating slip:', error);
      // Handle error
    }



}






 async savePDFLocally(pdfData:any){
  try {
    // Generate a unique file name
    const fileName = `Download/invoice_${Date.now()}.pdf`;
alert("m");
    // Write the PDF data to a file
    const result = await Filesystem.writeFile({
      path: fileName,
      data: pdfData,
      directory: Directory.ExternalStorage, // Choose the directory to save the file
      encoding: Encoding.UTF8 // Specify encoding (optional)
    });
    await Browser.open({ url: result.uri });
    // Log the file URI where the PDF is saved
    console.log('PDF saved at:', result.uri);
  } catch (error) {
    console.error('Error saving PDF:', error);
  }
}

  clearFields() {
    this.itemName = '';
    this.itemCategory = '';
    this.itemDescription = '';
    this.itemQuantity = 0;
    this.pickersDetails = '';
    this.dateOfPickup = '';
    this.timeOfPickup = '';
    this.barcode = '';
    this.imageBase64 = null;
    this.imageUrl = null;
  }

  async presentToast(message: string,color:string) {
    const toast = await this.ToastController.create({
      message: message,
      duration: 4000,
      position: 'top',
      color:color
    });
    toast.present();
  }
}
