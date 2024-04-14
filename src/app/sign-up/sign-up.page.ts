import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router'; // Import Router
import { LoadingController, NavController, ToastController, AlertController } from '@ionic/angular';
import { ProfilePage } from '../profile/profile.page';
import * as emailjs from 'emailjs-com';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  name: any;
  email: any;
  password: any;
  confirm_password: any;
  selectedRole:any;

  constructor(
    private db: AngularFirestore,
    private Auth: AngularFireAuth,
    private router: Router // Inject Router
    ,private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  async Register() {
    if (this.name =='') 
      {
        alert("Enter your full name")
        return;
      }

    if (this.email =='') 
      {
        alert("Enter email Address")
        return;
      }
      if (this.password =='') 
      {
        alert("Enter password")
        return;
      }  
  
    if (this.password !== this.confirm_password) {
      console.error('Passwords do not match');
      return;
    }
    const loader = await this.loadingController.create({
      // message: '|Registering you...',
      cssClass: 'custom-loader-class',
      spinner:"dots"
    });
   
     
    await loader.present();
    this.Auth.createUserWithEmailAndPassword(this.email, this.password)
      .then((userCredential: any) => { // Explicitly specify type
        if (userCredential.user) {
          this.db.collection('Users').add(
            {
              name:this.name,
              email: this.email,
              status: "pending",
              role : this.selectedRole,
            }
          )
            .then(() => {
          
              
             const templateParams = {
               mail_to:  this.email,
                admin : "admin",
                subject: "Registration notification ",
                message:"you are now registerd on the system the bestBrightness as a "+ this.selectedRole+" you can now login with :email-"+this.email +" password-"+this.password,
            };
              emailjs.send('service_iht2ej9', 'template_ma66v75', templateParams, 'sdec_-eHbbd95KUHJ')
              .then(function(response) {
                loader.dismiss();
                 console.log('SUCCESS!', response.status, response.text);
                 alert("email sebt to the new user with their login details");
              }, function(error) {
                loader.dismiss();
                 console.log('FAILED...', error);
              });

              console.log('User data added successfully');
              this.router.navigate(['/profile']);
            })
            
            .catch((error: any) => { // Explicitly specify type
              loader.dismiss();

              console.error('Error adding user data:', error);
            });
        } else {
          console.error('User credential is missing');
        }
      })
      .catch((error: any) => { // Explicitly specify type
        loader.dismiss();
        console.error('Error creating user:', error);
      });
  }
  
  
}
