import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { ModuleConst } from '../../data/const';
import {Logger} from  '../_services/logger.service';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { AuthenticationService } from '../_services/authentication.service';
import {ErrorComponent} from '../error/error.component';
import { UTProductMaintenanceModel } from '../_models/utproduct-maintenance.model'; 


@Injectable()
export class UTProductMainteanceService {
    constructor(
        @Inject(APP_CONFIG) private config: IAppConfig,
        private http: Http,
        private authenticationService: AuthenticationService) {
    }
   
   
  createProduct(userModel: UTProductMaintenanceModel): Observable<boolean> {
         let headers2 = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' },);
         return this.http.post("http://localhost:8080/iasbackend/api/ias-users", JSON.stringify( userModel ),{headers:headers2})
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
