import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-all-slips',
  templateUrl: './all-slips.page.html',
  styleUrls: ['./all-slips.page.scss'],
})
export class AllSlipsPage implements OnInit {
  itemFatched : any;
  formattedItem: any;

  constructor(private firestore: AngularFirestore, private router: Router) { 
    this.getData()
  }
  prevDate: any;
  ngOnInit() {
 
    console.log(this.itemFatched )
}
showDate(date: string): boolean {
  if (!this.prevDate || this.prevDate !== date) {
    this.prevDate = date;
    return true;
  }
  return false;
}

getData(){
  this.firestore.collection('slips').valueChanges().subscribe((data:any[])=>{
    this.itemFatched =data;
    console.log( this.itemFatched);
  })
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

