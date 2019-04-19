import { Component, OnInit } from '@angular/core';
import { Router, ChildActivationEnd, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

import { DataStorageService, Child, Measure } from 'src/app/shared/data-storage.service';


@Component({
  selector: 'app-manage-child',
  templateUrl: './manage-child.component.html',
  styleUrls: ['./manage-child.component.scss']
})
export class ManageChildComponent implements OnInit {

  manageChildForm: FormGroup;
  errorMessage: string;
  successMessage: string;

  child: Child;

  constructor(private dataStorageService: DataStorageService
    , private router: Router
    , private route: ActivatedRoute) { }

  ngOnInit() {

    this.manageChildForm = new FormGroup({
      'name': new FormControl(null),
      'birthDate': new FormControl(null),
      'gender': new FormControl('b'),
      'measuresHeight': new FormArray([]),
      'measuresWeight': new FormArray([])
    });

    this.route.params.subscribe(params => {
      let id = params["id"];
      if (id != null) {
        this.dataStorageService.getChildById(params.get("id"))
          .subscribe(pChild => {
            this.child = pChild;
            this.manageChildForm = new FormGroup({
              'name': new FormControl(this.child.name),
              'birthDate': new FormControl(this.child.birthDate),
              'gender': new FormControl(this.child.gender),
              'measuresHeight': new FormArray([]),
              'measuresWeight': new FormArray([])
            });
          })
      }
    });
    
  }

  onSubmit() {
    console.log(this.manageChildForm);

    const heightsArray: [] = this.manageChildForm.get('measuresHeight').value;
    heightsArray.map((measureFrom: Measure) => {
      const measureTo: Measure = {
        date: measureFrom.date,
        measure: measureFrom.measure
      }
      return measureTo;
    });

    const weightsArray: [] = this.manageChildForm.get('measuresWeight').value;
    weightsArray.map((measureFrom: Measure) => {
      const measureTo: Measure = {
        date: measureFrom.date,
        measure: measureFrom.measure
      }
      return measureTo;
    });

    let lChild: Child = {
      name: this.manageChildForm.get('name').value,
      birthDate: this.manageChildForm.get('birthDate').value,
      gender: this.manageChildForm.get('gender').value,
      heightsForDate: heightsArray,
      weightsForDate: weightsArray
    };

    this.dataStorageService.createChild(lChild)
      .then((child) => {
        lChild = child;
        this.errorMessage = null;
        this.successMessage = "Filho Cadastrado com Sucesso !!!";
        this.router.navigate(["/childs"]);
      })
      .catch((error) => {
        this.errorMessage = error;
        this.successMessage = null;
      });
  }

  onAddWeightMeasure() {
    //console.log("onAddWeightMeasure...");
    const measureWeight = new FormGroup({
      'measure': new FormControl(null),
      'date': new FormControl(null)
    });
    (<FormArray>this.manageChildForm.get('measuresWeight')).push(measureWeight);
  }

  onAddHeightMeasure() {
    console.log("onAddHeightMeasure...");
    const measureHeight = new FormGroup({
      'measure': new FormControl(null),
      'date': new FormControl(null)
    });
    (<FormArray>this.manageChildForm.get('measuresHeight')).push(measureHeight);
  }

  onRemoveWeightMeasure(index) {
    (<FormArray>this.manageChildForm.get('measuresWeight')).removeAt(index);
  }

  onRemoveHeightMeasure(index) {
    (<FormArray>this.manageChildForm.get('measuresHeight')).removeAt(index);
  }

}
