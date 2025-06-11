import { Delivery } from './../../shared/models/Delivery';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckoutService } from '../checkout.service';
import { BasketService } from '../../basket/basket.service';


@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.scss'
})
export class DeliveryComponent implements OnInit{
  constructor(private _service: CheckoutService,private basketService:BasketService) { }
  deliverys: Delivery[] = []
  setShippingPrice() {
    const delivery = this.deliverys.find(m => m.id == this.delivery.value.delivery)
    this.basketService.setShippingPrice(delivery);
  }
ngOnInit(): void {
  this._service.getDeliveryMethod().subscribe({
    next: (value) => {
      this.deliverys=value
    },
    error(err) {
        console.log(err)
    },
  })
}
@Input() delivery:FormGroup
}
