import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(    private auth: AngularFireAuth,private alertController: AlertController,  private router:Router, private toastController: ToastController) {
    this.sideMenu()
  }

  navigate:any

  sideMenu()
    {
      this.navigate =
      [
        {
          title : "Profile",
          url   : "/profile",
          icon  : "person-circle-outline"
        },
        {
          title : "Directories",
          url   : "/choose",
          icon  : "chevron-collapse-outline"
        }, {
          title : "Shop",
          url   : "/view",
          icon  : "storefront-outline"
        },
        {
          title : "Storeroom",
          url   : "/storeroom",
          icon  : "cube-outline"
        },
        {
          title : "Logout",
          
          icon  : "exit",
          click : this.logout.bind(this)
        },
      ]
    }
  


    logout() {
      // perform logout action, e.g. clear session, local storage, etc.
      this.presentConfirmationAlert()
    }

    async presentConfirmationAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Are you sure you want to SIGN OUT?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
         cssClass: 'my-custom-alert',
          handler: () => {
            console.log('Confirmation canceled');
          }
        }, {
          text: 'Confirm',
          handler: () => {
           
            
            this.auth.signOut().then(() => {
              this.router.navigateByUrl("/login");
              this.presentToast()

        
        
            }).catch((error) => {
            
            });

          }
        }
      ]
    });
    await alert.present();
  }

  
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'SIGNED OUT!',
      duration: 1500,
      position: 'top',
    
    });

    await toast.present();
  }
}
