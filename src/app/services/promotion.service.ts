import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable()
export class PromotionService {

  constructor() { }
  /*getDishes(): Promise<Dish[]> {
    return new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(DISHES), 2000);
    });
  }*/
  getPromotions(): Promise<Promotion[]> {
    return new Promise(resolve=> {
        setTimeout(() => resolve(PROMOTIONS),2000)
    });
  }

  getPromotion(id: number): Promise<Promotion> {
    return Promise.resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]);
  }

  getFeaturedPromotion(): Promise<Promotion> {
    return new Promise(resolve => {
      setTimeout(()=> resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]),2000)
    });
  }
}