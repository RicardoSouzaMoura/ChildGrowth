import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navBarOpen = false;
  menuGraficosOpen = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  toggleNavbar(){
    this.navBarOpen = !this.navBarOpen;
  }

  toggleMenuGraficos(){
    this.menuGraficosOpen = !this.menuGraficosOpen;
  }

  onLogout(){
    this.authService.logout();
  }


}
