import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable()
export class ProductMaintenanceService {
    result: Array<Object>;
    private productType: number;
    constructor(
        @Inject(APP_CONFIG) private config: IAppConfig,
        private http: Http,
        private authenticationService: AuthenticationService
      ) { }

    // Get products
    getProducts(): Observable<any> {
      let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' },);
      let options = new RequestOptions({ headers: headers });
      return this.http
        .get(`${this.config.apiEndpoint}products`, options)
        .map((response) => response.json())
    }

    // Get product types
     getProductType():  Observable<any> {
       this.productType = 1003;
       let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' },);
       let options = new RequestOptions({ headers: headers });
       return this.http
         .get(`${this.config.apiEndpoint}multipleEnumRefCodes/` + this.productType, options)
         .map((response) => response.json())
     }
}
