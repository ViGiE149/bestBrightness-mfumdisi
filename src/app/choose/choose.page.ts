import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { first } from 'rxjs';
import { NavController } from '@ionic/angular';
import {   ToastController , AlertController} from '@ionic/angular';

@Component({
  selector: 'app-choose',
  templateUrl: './choose.page.html',
  styleUrls: ['./choose.page.scss'],
})
export class ChoosePage implements OnInit {
  userDocument: any;

  constructor(   private toastController: ToastController, private auth: AngularFireAuth,
    private db: AngularFirestore,private navCtrl: NavController) { 
      this.getUser();
    }

  ngOnInit() {
  }
  goToAcceptUsers(){
        




  }
  async getUser(): Promise<void> {
    try {
      const user = await this.auth.currentUser;

      if (user) {
        const querySnapshot = await this.db
          .collection('Users', ref => ref.where('email', '==', user.email))
          .valueChanges({ idField: 'id' })
          .pipe(first())
          .toPromise();

        if (querySnapshot && querySnapshot.length > 0) {
          this.userDocument = querySnapshot[0];
          console.log('User Document:', this.userDocument); // Log user document
        }
      }
    } catch (error) {
      console.error('Error getting user document:', error);
      throw error; // Rethrow error for better error handling
    }
  }

  async navigateBasedOnRole(page: string): Promise<void> {
    try {
      const user = await this.auth.currentUser;
      if (!user) {
        throw new Error('User not found');
      }

      const querySnapshot = await this.db.collection('Users', ref => ref.where('email', '==', user.email))
        .valueChanges({ idField: 'id' })
        .pipe(first())
        .toPromise();

      if (!querySnapshot || querySnapshot.length === 0) {
        throw new Error('User document not found');
      }

      this.userDocument = querySnapshot[0];
      console.log('User Document:', this.userDocument); // Log user document

      let authorized = this.userDocument.role === "Manager";
      let message = authorized ? 'Authorized user for this page.' : 'Access denied for this page.';

      if (authorized) {
        this.navCtrl.navigateForward('/sign-up');
      } else {
        const toast = await this.toastController.create({
          message: 'Unauthorized Access: ' + message,
          duration: 2000,
          position: 'top'
        });
        toast.present();
      }
    } catch (error:any) {
      console.error('Error navigating based on role:', error);
      const toast = await this.toastController.create({
        message: 'Error: ' + error.message,
        duration: 2000,
        position: 'top'
      });
      toast.present();
    }
  }

  navigateToAddUsers(): Promise<void> {
    return this.navigateBasedOnRole('sign-up');
  }

  // navigateToUpdateInventory(): Promise<void> {
  //   return this.navigateBasedOnRole('view');
  // }

  // navigateToPickupInventory(): Promise<void> {
  //   return this.navigateBasedOnRole('add-inventory-storeroom');
  // }

  // navigateToDeliverInventory(): Promise<void> {
  //   return this.navigateBasedOnRole('analytics');
  // }
  // navigateToViewStoreRoom(): Promise<void> {
  //   return this.navigateBasedOnRole('storeroom');
  // }

  // navigateToStoreInventory(): Promise<void> {
  //   return this.navigateBasedOnRole('view');
  // }
}
