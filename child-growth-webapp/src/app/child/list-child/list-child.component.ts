import { Component, OnInit } from '@angular/core';
import { DataStorageService, Child } from 'src/app/shared/data-storage.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-list-child',
  templateUrl: './list-child.component.html',
  styleUrls: ['./list-child.component.scss']
})
export class ListChildComponent implements OnInit {
  
  childs: Observable<Child[]>;
  errorMessage: string;

  constructor(private dataStorageService: DataStorageService) {
    dataStorageService.listChilds()
    .then((childs)=>{
      this.childs = childs;
    })
    .catch((error)=>{
      this.errorMessage = error;
    });
  };

  ngOnInit() {
  }

}
