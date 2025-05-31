import { Basket, IBasket, IBasketItem } from './../shared/models/Basket';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  constructor(private _http: HttpClient) {}
  baseUrl = 'https://localhost:44375/api/';
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();
  GetBasket(id: string) {
    return this._http.get(this.baseUrl + 'Basket/get-basket-item/' + id).pipe(
      map((res: IBasket) => {
        this.basketSource.next(res);
        return res
      })
    );
  }

  postBasket(basket: IBasket) {
    return this._http
      .post(this.baseUrl + 'Basket/update-basket', basket)
      .subscribe({
        next: (value: IBasket) => {
          this.basketSource.next(value);
          console.log(value);
        },
        error(err) {
          console.log(err);
        },
      });
  }

  getCurrentValue() {
    return this.basketSource.value;
  }
  addItemToBasket(product: IProduct, quantity: number = 1) {
    const itemToAdd: IBasketItem = this.mapProductToBasketItem(
      product,
      quantity
    );
    let basket = this.getCurrentValue()
    if (basket.id == null) {

      basket= this.CreateBasket();
    }
    basket.basketItems = this.AddOrUpdate(
      basket.basketItems,
      itemToAdd,
      quantity
    );
    return this.postBasket(basket);
  }
  private AddOrUpdate(
    basketItems: IBasketItem[],
    itemToAdd: IBasketItem,
    quantity: number
  ): IBasketItem[] {
    const index = basketItems.findIndex((i) => i.id === itemToAdd.id);
    if (index == -1) {
      itemToAdd.quanatity = quantity;
      basketItems.push(itemToAdd);
    } else {
      basketItems[index].quanatity += 1;
    }
    return basketItems;
  }
  private CreateBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basketId', basket.id);
    return basket;
  }
  private mapProductToBasketItem(
    product: IProduct,
    quantity: number
  ): IBasketItem {
    return {
      id: product.id,
      category: product.categoryName,
      image: product.photos[0].imageName,
      name: product.name,
      price: product.newPrice,
      quanatity: quantity,
      description:product.description
    };
  }
  incrementBasketItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentValue();
    const basketIndex = basket.basketItems.findIndex(i => i.id === item.id)
    basket.basketItems[basketIndex].quanatity++;
    this.postBasket(basket);
  }
  decrementBasketItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentValue();
    const basketIndex = basket.basketItems.findIndex(i => i.id === item.id)
    if (basket.basketItems[basketIndex].quanatity >1) {
        basket.basketItems[basketIndex].quanatity--;
        this.postBasket(basket);
    }
    else {
      this.removeItemFromBasket(item);
    }

  }
  removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCurrentValue();
    if (basket.basketItems.some(i => i.id === item.id)) {
      basket.basketItems = basket.basketItems.filter((i) => i.id !== item.id);
      if (basket.basketItems.length > 0) {
        this.postBasket(basket);
      }
      else {
        this.deleteBasketItem(basket);
      }
    }

  }
  deleteBasketItem(basket: IBasket) {
    return this._http.delete(this.baseUrl + '/api/Basket/delete-basket/' + basket.id).subscribe({
      next: (value) => {
        this.basketSource.next(null);
        localStorage.removeItem("basketId");
      },
      error(err) {
        console.log(err);
      }
    })
  }
}
