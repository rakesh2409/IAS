import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { ModuleConst } from '../../data/const';
import {Logger} from  '../_services/logger.service';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { AuthenticationService } from '../_services/authentication.service';
import {ErrorComponent} from '../error/error.component';
import { ProductProviderModel } from '../_models/product-provider.model';

@Injectable()
export class ProductProviderService {
    constructor(
        @Inject(APP_CONFIG) private config: IAppConfig,
        private http: Http,
        private authenticationService: AuthenticationService) {
    }
     getProductProvider(searchParam : string, type : string): Observable<any> {
      let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' },);
        let options = new RequestOptions({ headers: headers });
        return this.http.get("http://localhost:8080/iasbackend/api/product-providers-status/APPROVED/"+searchParam+"/"+type, options)
            .map((response: Response) => {
                console.log(response);
               return  response.json();
            });
     }
     
     getProductProviderByName(ppName : string, status : string): Observable<any> {
      let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' },);
        let options = new RequestOptions({ headers: headers });
        return this.http.get("http://localhost:8080/iasbackend/api/product-providers/"+status+"/"+ppName, options)
            .map((response: Response) => {
                console.log(response);
               return  response.json();
            });
     }
     
      createProductProvider(ppModel: ProductProviderModel): Observable<boolean> {
         let headers2 = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' },);
         return this.http.post("http://localhost:8080/iasbackend/api/product-providers", JSON.stringify( ppModel ),{headers:headers2})
              .map((response: Response) => {
                  console.log(response);
                  let errorMessages = response.json().authenticationException;
                  return true;
              }).catch((err) => this.errorHandling(err))
    }
    
    updatePPRequest(providerName: string, status: string): Observable<boolean> {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' },);
         let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:8080/iasbackend/api/updatePPAccess/'+providerName+'/'+status,JSON.stringify({}), options)
             .map((response: Response) => {
                 console.log(response);
                 let errorMessages = response.json().authenticationException;
                 return true;
             }).catch((err) => this.errorHandling(err))
   }
   
   
   deleteProductProvider(providerName: string): Observable<boolean> {
       let headers2 = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' },);
       return this.http.delete("http://localhost:8080/iasbackend/api/product-providers/"+providerName, {headers:headers2})
            .map((response: Response) => {
                console.log(response);
                return true;
            }).catch((err) => this.errorHandling(err))
     }
     
     
      unlockData(providerName: string): Observable<boolean> {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' },);
         let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:8080/iasbackend/api/unLockPPData/'+providerName,JSON.stringify({}), options)
             .map((response: Response) => {
                 console.log(response);
                 let errorMessages = response.json().authenticationException;
                 return true;
             }).catch((err) => this.errorHandling(err))
     }
     
     
     
  
      private errorHandling (error : Response | any){
         let errMsg : string;
         if (error instanceof Response){
               const body = error.json() || '';
               const err = body.error || JSON.stringify(body);
               errMsg = `${error.status} - ${error.statusText || ''} ${err}`; 
         }else {
        errMsg = error.message ? error.message : error.toString();
      }
  
         console.log("authentication service  "+error);
         return Observable.throw(errMsg);
  
    }
}