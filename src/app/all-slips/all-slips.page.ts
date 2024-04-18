import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-all-slips',
  templateUrl: './all-slips.page.html',
  styleUrls: ['./all-slips.page.scss'],
})
export class AllSlipsPage implements OnInit {
  item$: any;
  formattedItem: any;

  constructor(private firestore: AngularFirestore, private router: Router) { }
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

passTO(slip:any){

  let navi: NavigationExtras = {
    state: {
     slip
    },
  };
  this.router.navigate(['/slips'], navi);

}








}

