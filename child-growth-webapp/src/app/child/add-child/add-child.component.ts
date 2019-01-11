import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { NgForm } from '@angular/forms';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.scss']
})
export class AddChildComponent implements OnInit {

  errorMessage: string;
  successMessage: string;

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {
  }

  createChild(form: NgForm) {
    const name = form.value.name;
    const birthDate = form.value.birthDate;
    const gender = form.value.gender;

    this.dataStorageService.createChild(name, birthDate, gender)
      .then((res) => {
        this.errorMessage = null;
        this.successMessage = res;
      })
      .catch((error) => {
        this.errorMessage = error;
        this.successMessage = null;
      });
  }

}
