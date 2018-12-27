import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navBarOpen = false;

  constructor() { }

  ngOnInit() {
  }

  toggleNavbar(){
    this.navBarOpen = !this.navBarOpen;
  }

}
