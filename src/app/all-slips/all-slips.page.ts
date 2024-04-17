import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-all-slips',
  templateUrl: './all-slips.page.html',
  styleUrls: ['./all-slips.page.scss'],
})
export class AllSlipsPage implements OnInit {
  item$: any;
  formattedItem: any;

  constructor(private firestore: AngularFirestore,) { }
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
passTO(){}

}

