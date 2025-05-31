import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../basket/basket.service';
import { Observable } from 'rxjs';
import { IBasket } from '../../shared/models/Basket';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {
  constructor(private _basket: BasketService) { }
  basketLen:Observable<IBasket>
  ngOnInit(): void {
    const basketId = localStorage.getItem('basketId');
    this._basket.GetBasket(basketId).subscribe({
      next:(value) =>{
        console.log(value);
        this.basketLen = this._basket.basket$
      },
      error(err) {
        console.log(err);
      }
    });

  }
  visibale: boolean = false
  isNavbarCollapsed:boolean = true;
  toggleDropdown() {
    this.visibale=!this.visibale
  }
}
