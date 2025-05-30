import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { IProduct } from '../../shared/models/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
  constructor(private _shopService: ShopService,private _route:ActivatedRoute) { }
  product: IProduct
  id: number
  mainImage: string;
  ngOnInit(): void {
    this.loadProduct()
  }

  loadProduct() {
    this.id = parseInt(this._route.snapshot.paramMap.get('id'))
    this._shopService.getProductDetails(parseInt(this._route.snapshot.paramMap.get('id'))).subscribe({
      next: ((value) => {
        this.product = value
        this.mainImage=this.product.photos[0].imageName
      })
    })

  }
  ReplaceImage(src: string) {
    this.mainImage=src
  }


}
