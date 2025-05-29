import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { Ipagnation } from '../shared/models/pagnation';
import { IProduct } from '../shared/models/product';
import { ICategory } from '../shared/models/category';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  constructor(private _shopService: ShopService) {}
  product: IProduct[];
  category: ICategory[];
  categoryId: number;
  sortSelected: string;
  search: string;

  sortingOption = [
    { name: 'Name', value: 'Name' },
    { name: 'Price:min-max', value: 'PriceAcn' },
    { name: 'Price:max-min', value: 'PriceDce' },
  ];
  ngOnInit(): void {
    this.getAllProduct();
    this.getCategory();
  }

  getAllProduct() {
    this._shopService
      .getProduct(this.categoryId, this.sortSelected, this.search)
      .subscribe({
        next: (value: Ipagnation) => {
          this.product = value.data;
        },
      });
  }
  getCategory() {
    this._shopService.getCategory().subscribe({
      next: (value) => {
        this.category = value;
      },
    });
  }

  selectedId(categoryid: number) {
    this.categoryId = categoryid;
    this.getAllProduct();
  }
  sortingByPrice(sort: Event) {
    this.sortSelected = (sort.target as HTMLInputElement).value;
    console.log(this.sortSelected);
    this.getAllProduct();
  }

  onSearch() {
    // this.search = Search;
    this.getAllProduct();
  }
  resetValue() {
    this.search = '';
    this.sortSelected = '';
    this.categoryId = 0;
    this.getAllProduct();
  }
}
