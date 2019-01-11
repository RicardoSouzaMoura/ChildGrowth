import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navBarOpen = false;
  menuGraficosOpen = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  toggleNavbar(){
    this.navBarOpen = !this.navBarOpen;
  }

  toggleLink(route:string){
    if (this.navBarOpen){
      this.navBarOpen = false;
    }
    console.log("rota: "+route);
    this.router.navigate([route]);
  }

  toggleMenuGraficos(){
    this.menuGraficosOpen = !this.menuGraficosOpen;
  }

  onLogout(){
    if (this.navBarOpen){
      this.navBarOpen = false;
    }
    this.authService.logout();
    this.router.navigate(["/"]);
  }


}
