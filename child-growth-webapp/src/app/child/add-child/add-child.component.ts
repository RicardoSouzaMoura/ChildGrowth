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

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {
  }

  createChild(form: NgForm) {
    const name = form.value.name;
    const dtNascimento = form.value.dtNascimento;
    const gender = form.value.gender;

    this.dataStorageService.createChild(name, dtNascimento, gender)
      .then((res) => {
        console.log("res: " + res);
      })
      .catch((error) => {
        this.errorMessage = error;
        console.log("error: " + error);
      });
  }

}