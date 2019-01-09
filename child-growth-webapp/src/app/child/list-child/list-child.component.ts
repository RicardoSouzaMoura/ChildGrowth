import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-child',
  templateUrl: './list-child.component.html',
  styleUrls: ['./list-child.component.scss']
})
export class ListChildComponent implements OnInit {

  itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;
  
  constructor(afs: AngularFirestore) {
    this.itemsCollection = afs.collection<any>('child');
    this.items = this.itemsCollection.valueChanges();
    this.items.forEach((item) => {
      let SD0 = new Array();
      let SD1 = new Array();
      let SD2 = new Array();
      let SD1Neg = new Array();
      let SD2Neg = new Array();
      let month = new Array();

      //console.log(JSON.stringify(item));
      item.forEach((data) => {
        month.push(data.month);
        SD0.push(data.SD0);
        SD1.push(data.SD1);
        SD2.push(data.SD2);
        SD1Neg.push(data.SD1neg);
        SD2Neg.push(data.SD2neg);
      })
    })
  };

  ngOnInit() {
  }

}
