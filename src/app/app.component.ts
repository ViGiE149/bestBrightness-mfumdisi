import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private alertController: AlertController,  private router:Router, private toastController: ToastController) {
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
           
            
          
              //this.router.navigateByUrl("/login");
             // this.presentToast()
        
        
           


          }
        }
      ]
    });
    await alert.present();
  }

}
