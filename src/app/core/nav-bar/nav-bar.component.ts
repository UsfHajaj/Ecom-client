import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  visibale: boolean = false
  isNavbarCollapsed:boolean = true;
  toggleDropdown() {
    this.visibale=!this.visibale
  }
}
