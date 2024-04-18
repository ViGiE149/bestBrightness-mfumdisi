import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-slips',
  templateUrl: './slips.page.html',
  styleUrls: ['./slips.page.scss'],
})
export class SlipsPage implements OnInit {
  item$: any;
  formattedItem: any;

  constructor(private firestore: AngularFirestore, private route: ActivatedRoute,
    private router: Router) {
      this.getPassedData()
     }
  prevDate: any;
  ngOnInit() {
    this.item$ = this.firestore.collection('slips').valueChanges();
}
showDate(date: string): boolean {
  if (!this.prevDate || this.prevDate !== date) {
    this.prevDate = date;
    return true;
  }
  return false;
}


async getPassedData() {
  if (this.router.getCurrentNavigation()?.extras.state) {
    this.item$ = await this.router.getCurrentNavigation()?.extras.state;
    console.log(this.item$);
   
     }
  }


}

