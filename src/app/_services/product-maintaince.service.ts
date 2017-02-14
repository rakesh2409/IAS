import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { ModuleConst } from '../../data/const';
import { Logger } from '../_services/logger.service';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { AuthenticationService } from '../_services/authentication.service';
import { ErrorComponent } from '../error/error.component';
import { ProductMaintenanceModel } from '../_models/product-maintenance.model';


@Injectable()
export class ProductMainteanceService {
    private productType: number;
    private allDropDownValues = [];

    constructor(
        @Inject(APP_CONFIG) private config: IAppConfig,
        private http: Http,
        private authenticationService: AuthenticationService) {
    }

    private errorHandling(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }

        console.log("Error in calling  " + error);
        return Observable.throw(errMsg);

    }  

    createProductsByStatus(productType: string,prodModel: ProductMaintenanceModel): Observable<any> {
        let headers2 = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' }, );
        return this.http.post("http://localhost:8080/iasbackend/api/createProduct/" + productType, JSON.stringify(prodModel), { headers: headers2 })
            .map((response: Response) => {
                console.log(response);
                return response.json();
            }).catch((err) => this.errorHandling(err))
      }
   

    updateAllProductsStatus(productPkId: string, productStatus: string, prodType: string): Observable<boolean> {       
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' }, );
        let options = new RequestOptions({ headers: headers });
        return this.http.put("http://localhost:8080/iasbackend/api/updateProductStatusGlobal/" + productPkId + '/' + productStatus + '/' + prodType, JSON.stringify({}), options)
            .map((response: Response) => {
                console.log(response);
                return true;
            }).catch((err) => this.errorHandling(err))
    }

    unlockData(productPkId: string): Observable<string> {
       
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' }, );
        let options = new RequestOptions({ headers: headers });
        return this.http.post("http://localhost:8080/iasbackend/api/unlockProductDataGlobal/" + productPkId, options)
            .map((response: Response) => {
                console.log(response);
                response.json();
            }).catch((err) => this.errorHandling(err))
    }

    getProductTypes(): Observable<any> {
        this.productType = 1003;
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' }, );
        let options = new RequestOptions({ headers: headers });
        return this.http.get("http://localhost:8080/iasbackend/api/multipleEnumRefCodes/" + this.productType, options)
            .map((response: Response) => {
                console.log(response);
                return response.json();
          });
    } 

     getProductTypeByProductPkId(productId: string): Observable<any> {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' }, );
        let options = new RequestOptions({ headers: headers });
        return this.http.get("http://localhost:8080/iasbackend/api/getProductTypeByPrimaryKey/" + productId, options)
            .map((response: Response) => {
                console.log("getProductTypeByProductPkId======> "+response);
                return response.json();
            });
    }  

    getUTProductData(utProductId: string, status: string): Observable<any> {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' }, );
        let options = new RequestOptions({ headers: headers });
        return this.http.get("http://localhost:8080/iasbackend/api/u-t-products/" + utProductId + '/' + status, options)
            .map((response: Response) => {
                console.log(response);
                return response.json();
            });
    }

    getDciProductData(dciProductId: string, status: string): Observable<any> {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' }, );
        let options = new RequestOptions({ headers: headers });
        return this.http.get("http://localhost:8080/iasbackend/api/u-t-products/" + dciProductId + '/' + status, options)
            .map((response: Response) => {
                console.log(response);
                return response.json();
            });
    }

    getSPProductData(spProductId: string, status: string): Observable<any> {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' }, );
        let options = new RequestOptions({ headers: headers });
        return this.http.get("http://localhost:8080/iasbackend/api/u-t-products/" + spProductId + '/' + status, options)
            .map((response: Response) => {
                console.log(response);
                return response.json();
            });
    }

    getSDProductData(sdProductId: string, status: string): Observable<any> {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' }, );
        let options = new RequestOptions({ headers: headers });
        return this.http.get("http://localhost:8080/iasbackend/api/sd-products/" + sdProductId + '/' + status, options)
            .map((response: Response) => {
                console.log(response);
                return response.json();
            });
    }

    getInsuranceProductData(insProductId: string, status: string): Observable<any> {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' }, );
        let options = new RequestOptions({ headers: headers });
        return this.http.get("http://localhost:8080/iasbackend/api/u-t-products/" + insProductId + '/' + status, options)
            .map((response: Response) => {
                console.log(response);
                return response.json();
            });
    }

    getBondsProductData(bondsProductId: string, status: string): Observable<any> {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' }, );
        let options = new RequestOptions({ headers: headers });
        return this.http.get("http://localhost:8080/iasbackend/api/u-t-products/" + bondsProductId + '/' + status, options)
            .map((response: Response) => {
                console.log(response);
                return response.json();
            });
    }  

    getAllProductList(): Observable<any> {

        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' }, );
        let options = new RequestOptions({ headers: headers });
        return this.http.get("http://localhost:8080/iasbackend/api/products/", options)
            .map((response: Response) => {
                console.log(response);
                return response.json();
            });
    }
    getAllDropDownValues(): Observable<any> {        
        this.allDropDownValues.push(1004, 1005, 1006, 1008, 1009, 1010, 1011, 1020, 1021, 1022, 1023, 1026);      

        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' }, );
        let options = new RequestOptions({ headers: headers });
        return this.http.get("http://localhost:8080/iasbackend/api/multipleEnumRefCodes/" + this.allDropDownValues, options)
            .map((response: Response) => {
                console.log(response);
                return response.json();
            });
    }
}