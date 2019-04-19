import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ChartComponent } from 'angular2-chartjs';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { DataStorageService, Child, Measure } from 'src/app/shared/data-storage.service';
import { UtilService } from 'src/app/shared/util.service';

@Component({
  selector: 'chart-bmi',
  templateUrl: './bmi.component.html',
  styleUrls: ['./bmi.component.scss']
})
export class BmiForAgeComponent implements OnInit {

  childHeightBMI = new Array();
  childWeightBMI = new Array();
  childHeight = new Array();
  childWeight = new Array();

  child: Child;

  @ViewChild('bmiChart') bmiChart: ChartComponent;
  @ViewChild('heightChart') heightChart: ChartComponent;
  @ViewChild('weightChart') weightChart: ChartComponent;

  type = 'line';
  bmiData = {
    labels: [],
    datasets: []
  };
  bmiOptions = {
    title: { text: "Indice de Massa Corporal (BMI) X Idade", display: true },
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'BMI (Kg/m2)'
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

  weightData = {
    labels: [],
    datasets: []
  };
  weightOptions = {
    title: { text: "Peso X Idade", display: true },
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Peso (Kg)'
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

  heightData = {
    labels: [],
    datasets: []
  };
  heightOptions = {
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
          labelString: 'Altura (m)'
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

  constructor(private route: ActivatedRoute,
    private dataStorageService: DataStorageService,
    private utilService: UtilService) {
  };

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      let childId = params['childId'];
      console.log("childId: " + childId);
      this.dataStorageService.getChildById(childId).subscribe(
        (child: Child) => {
          this.child = child;
          this.child.id = childId;
          console.log("child: " + JSON.stringify(child));
          this.drawnChart(this.child);
        }
      );

    });
  }

  drawnBasicBMIChart(yearDif, gender) {
    let bmiDataChart: Observable<any[]>;
    bmiDataChart = this.dataStorageService.listChartData(yearDif, gender, 'bmiForAge');
    bmiDataChart.forEach((item) => {
      this.bmiData.datasets = [];
      let SD0 = new Array();
      let SD1 = new Array();
      let SD2 = new Array();
      let SD1Neg = new Array();
      let SD2Neg = new Array();
      let month = new Array();

      //console.log("item: " + JSON.stringify(item));
      item.forEach((data) => {
        month.push(data.month);
        SD0.push(data.SD0);
        SD1.push(data.SD1);
        SD2.push(data.SD2);
        SD1Neg.push(data.SD1neg);
        SD2Neg.push(data.SD2neg);
      });

      this.bmiData.datasets.push({ pointRadius: 0, fill: false, borderColor: "red", label: "SD2Neg", data: SD2Neg });
      this.bmiData.datasets.push({ pointRadius: 0, fill: false, borderColor: "yellow", label: "SD1Neg", data: SD1Neg });
      this.bmiData.datasets.push({ pointRadius: 0, fill: false, borderColor: "green", label: "SD0", data: SD0 });
      this.bmiData.datasets.push({ pointRadius: 0, fill: false, borderColor: "yellow", label: "SD1", data: SD1 });
      this.bmiData.datasets.push({ pointRadius: 0, fill: false, borderColor: "red", label: "SD2", data: SD2 });

      this.bmiData.labels = month;
      //console.log("updating...");
      this.bmiChart.chart.update();

    })
  }

  drawnBasicHeightChart(yearDif, gender) {
    let heightDataChart: Observable<any[]>;
    heightDataChart = this.dataStorageService.listChartData(yearDif, gender, 'heightForAge');
    heightDataChart.forEach((item) => {
      this.heightData.datasets = [];
      let SD0 = new Array();
      let SD1 = new Array();
      let SD2 = new Array();
      let SD1Neg = new Array();
      let SD2Neg = new Array();
      let month = new Array();

      //console.log("item: " + JSON.stringify(item));
      item.forEach((data) => {
        month.push(data.month);
        SD0.push(data.SD0);
        SD1.push(data.SD1);
        SD2.push(data.SD2);
        SD1Neg.push(data.SD1neg);
        SD2Neg.push(data.SD2neg);
      });

      this.heightData.datasets.push({ pointRadius: 0, fill: false, borderColor: "red", label: "SD2Neg", data: SD2Neg });
      this.heightData.datasets.push({ pointRadius: 0, fill: false, borderColor: "yellow", label: "SD1Neg", data: SD1Neg });
      this.heightData.datasets.push({ pointRadius: 0, fill: false, borderColor: "green", label: "SD0", data: SD0 });
      this.heightData.datasets.push({ pointRadius: 0, fill: false, borderColor: "yellow", label: "SD1", data: SD1 });
      this.heightData.datasets.push({ pointRadius: 0, fill: false, borderColor: "red", label: "SD2", data: SD2 });

      this.heightData.labels = month;
      //console.log("updating...");
      this.heightChart.chart.update();

    })
  }

  drawnBasicWeightChart(yearDif, gender) {
    let weightDataChart: Observable<any[]>;
    weightDataChart = this.dataStorageService.listChartData(yearDif, gender, 'weightForAge');
    weightDataChart.forEach((item) => {
      this.weightData.datasets = [];
      let SD0 = new Array();
      let SD1 = new Array();
      let SD2 = new Array();
      let SD1Neg = new Array();
      let SD2Neg = new Array();
      let month = new Array();

      //console.log("item: " + JSON.stringify(item));
      item.forEach((data) => {
        month.push(data.month);
        SD0.push(data.SD0);
        SD1.push(data.SD1);
        SD2.push(data.SD2);
        SD1Neg.push(data.SD1neg);
        SD2Neg.push(data.SD2neg);
      });

      this.weightData.datasets.push({ pointRadius: 0, fill: false, borderColor: "red", label: "SD2Neg", data: SD2Neg });
      this.weightData.datasets.push({ pointRadius: 0, fill: false, borderColor: "yellow", label: "SD1Neg", data: SD1Neg });
      this.weightData.datasets.push({ pointRadius: 0, fill: false, borderColor: "green", label: "SD0", data: SD0 });
      this.weightData.datasets.push({ pointRadius: 0, fill: false, borderColor: "yellow", label: "SD1", data: SD1 });
      this.weightData.datasets.push({ pointRadius: 0, fill: false, borderColor: "red", label: "SD2", data: SD2 });

      this.weightData.labels = month;
      //console.log("updating...");
      this.weightChart.chart.update();

    })
  }

  drawnChart(child) {

    let yearNow = new Date().getFullYear();
    let yearDif = yearNow - this.child.birthDate.toDate().getFullYear();
    console.log("age: " + yearDif);

    this.drawnBasicBMIChart(yearDif, child.gender);
    this.drawnBasicHeightChart(yearDif, child.gender);
    this.drawnBasicWeightChart(yearDif, child.gender);

    let childHeightDataChart: Observable<any[]>;
    childHeightDataChart = this.dataStorageService.listChildMeasure(yearNow, child.id, "heightsForDate");
    childHeightDataChart.forEach((item) => {
      this.childHeightBMI = new Array();
      console.log("item: " + JSON.stringify(item));
      item.forEach((data: Measure) => {
        let month = this.utilService.getDifMonths(this.child.birthDate.toDate(), data.date.toDate());
        this.childHeight.push({ y: data.measure, x: month });
        this.childHeightBMI.push({ y: data.measure, x: data.date });
      });
      this.drawnChildBMIData();
      this.drawnChildMeasure('height');
    });

    let childWeightDataChart: Observable<any[]>;
    childWeightDataChart = this.dataStorageService.listChildMeasure(yearNow, child.id, "weightsForDate");
    childWeightDataChart.forEach((item) => {
      this.childWeightBMI = new Array();
      console.log("item: " + JSON.stringify(item));
      item.forEach((data: Measure) => {
        let month = this.utilService.getDifMonths(this.child.birthDate.toDate(), data.date.toDate());
        this.childWeight.push({ y: data.measure, x: month });
        this.childWeightBMI.push({ y: data.measure, x: data.date });
      });
      this.drawnChildBMIData();
      this.drawnChildMeasure('weight');
    });

  }

  drawnChildMeasure(type) {
    if (type === 'weight') {
      this.weightChart.data.datasets.push({ pointRadius: 0, fill: false, borderColor: "orange", label: "childWeightData", data: this.childWeight });
      this.weightChart.chart.update();
    }
    else {
      this.heightChart.data.datasets.push({ pointRadius: 0, fill: false, borderColor: "orange", label: "childHeightData", data: this.childHeight });
      this.heightChart.chart.update();
    }
  }

  // metodo para desenhar os dados das medidas dos filhos depois de carregado
  // apenas leva em consideracao medidas no mesmo mes
  drawnChildBMIData() {
    let childBMIData = new Array();
    this.childHeightBMI.forEach((childHeight) => {
      this.childWeightBMI.forEach((childWeight) => {
        //console.log("childHeight.x: "+childHeight.x);
        //console.log("childWeight.x: "+childWeight.x);
        if (childHeight.x.seconds === childWeight.x.seconds) {
          //console.log("entrou");
          let month = this.utilService.getDifMonths(this.child.birthDate.toDate(), childHeight.x.toDate());
          //console.log("month: "+month);
          childBMIData.push({ y: this.utilService.calculaBMI(childHeight.y, childWeight.y), x: month });
        }
      });
    });
    this.bmiData.datasets.push({ pointRadius: 0, fill: false, borderColor: "orange", label: "childBMIData", data: childBMIData });
    this.bmiChart.chart.update();
  }

}
