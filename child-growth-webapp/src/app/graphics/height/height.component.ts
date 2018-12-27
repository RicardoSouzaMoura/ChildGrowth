import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ChartComponent } from 'angular2-chartjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'graphic-height',
  templateUrl: './height.component.html',
  styleUrls: ['./height.component.scss']
})
export class HeightComponent implements OnInit {

  itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;
  @ViewChild(ChartComponent) chart: ChartComponent;

  type = 'line';
  data = {
    labels: [],
    datasets: []
  };
  options = {
    title: { text: "Altura X Idade", display: true },
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Altura (cm)'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Meses'
        }
      }]
    }
  };

    constructor(afs: AngularFirestore) {
    this.itemsCollection = afs.collection<any>('heightForAge',
      ref => ref.where('gender', '==', 'b')
        .where('month', '<=', 24)
        .orderBy('month')
    );
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

      this.data.datasets.push({ pointRadius: 0, fill: false, borderColor: "red", label: "SD2Neg", data: SD2Neg });
      this.data.datasets.push({ pointRadius: 0, fill: false, borderColor: "yellow", label: "SD1Neg", data: SD1Neg });
      this.data.datasets.push({ pointRadius: 0, fill: false, borderColor: "green", label: "SD0", data: SD0 });
      this.data.datasets.push({ pointRadius: 0, fill: false, borderColor: "yellow", label: "SD1", data: SD1 });
      this.data.datasets.push({ pointRadius: 0, fill: false, borderColor: "red", label: "SD2", data: SD2 });

      this.data.labels = month;
      this.chart.chart.update();

    })
  };

  ngOnInit() {
  }

}
