import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Measure, Child, DataStorageService } from 'src/app/shared/data-storage.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-child',
  templateUrl: './edit-child.component.html',
  styleUrls: ['./edit-child.component.scss']
})
export class EditChildComponent implements OnInit {

  manageChildForm: FormGroup;
  errorMessage: string;
  successMessage: string;

  child: Child;

  constructor(private dataStorageService: DataStorageService
    , private router: Router, private route: ActivatedRoute) { }

  isEditMode() {
    return this.child != null;
  }

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
        this.dataStorageService.getChildById(id)
          .subscribe(pChild => {
            this.child = pChild;
            this.child.id = id;
            this.manageChildForm = new FormGroup({
              'name': new FormControl(this.child.name),
              'birthDate': new FormControl(this.child.birthDate),
              'gender': new FormControl(this.child.gender)
            });
          })
      }
    });
  }

  onSubmit() {
    console.log(this.manageChildForm);

    let lChild: Child = {
      name: this.manageChildForm.get('name').value,
      birthDate: this.manageChildForm.get('birthDate').value,
      gender: this.manageChildForm.get('gender').value
    };

    if (this.isEditMode()) {
      this.dataStorageService.editChild(lChild)
      .then((child) => {
        lChild = child;
        this.errorMessage = null;
        this.successMessage = "Filho Atualizado com Sucesso !!!";
        this.router.navigate(["/childs"]);
      })
      .catch((error) => {
        this.errorMessage = error;
        this.successMessage = null;
      });
    }
    else {
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
  }

}
