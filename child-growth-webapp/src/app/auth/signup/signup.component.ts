import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  errorMessage = "";
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignUp(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const name = form.value.name;

    this.authService.signupUser(email, password, name)
      .then((res) => {
        console.log("res: " + res);
      })
      .catch((error) => {
        this.errorMessage = error;
        console.log("error: " + error);
      });
  }

}
