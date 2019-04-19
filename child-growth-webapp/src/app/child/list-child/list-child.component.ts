import { Component, OnInit } from '@angular/core';
import { DataStorageService, Child } from 'src/app/shared/data-storage.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-child',
  templateUrl: './list-child.component.html',
  styleUrls: ['./list-child.component.scss']
})
export class ListChildComponent implements OnInit {

  childs: Child[];
  errorMessage: string;

  constructor(private dataStorageService: DataStorageService, private router: Router) {
    dataStorageService.listChilds()
      .subscribe(
        (childs) => {
          this.childs = childs;
        },
        (error) => {
          this.errorMessage = error;
        }
      );
  };

  ngOnInit() {
  }

  showBMIChart(index) {
    console.log("index: " + this.childs[index].name);
    this.router.navigate(['/bmiForAgeChart/'+this.childs[index].id]);
  }

}
