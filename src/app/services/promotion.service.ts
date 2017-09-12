import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import { Http, Response } from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { RestangularModule, Restangular } from 'ngx-restangular';

@Injectable()
export class PromotionService {

  constructor(private restangular: Restangular,
    private processHTTPMsgService: ProcessHTTPMsgService) { }
  
  getPromotions(): Observable<Promotion[]> {
    return this.restangular.all('promotions').getList();
  }
  getPromotion(id: number): Observable<Promotion> {
    return this.restangular.all('promotions').getList();
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.restangular.all('promotions?featured=true').getList();
  }

}