import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable()
export class ParamSettingsService {
    private options: RequestOptions;  
    constructor(
        @Inject(APP_CONFIG) private config: IAppConfig,
        private http: Http,
        private authenticationService: AuthenticationService) {
            let headers = new Headers({ 'Authorization': 'Bearer ' 
                + this.authenticationService.token, 'Content-Type': 'application/json' },);
            this.options = new RequestOptions({ headers: headers });
    }
    
    getProductList(stat: string): Observable<any> {
        return this.http.get(`${this.config.apiEndpoint}getProductList/${stat}`, this.options)
            .map((response: Response) => {
                console.log(response);
               return  response.json().data;
            });
    }
    
    getGlobalParameter(status: string): Observable<any> {    
        return this.http.get(`${this.config.apiEndpoint}global-parameters/${status}`, this.options)
            .map((response: Response) => {
                console.log(response);
               return  response.json();
            });
    }
    
    saveGlobalParameter(globalParam: Array<any>, productList: Array<any>): Observable<boolean> {      
        return this.http.post(`${this.config.apiEndpoint}global-parameters`,JSON.stringify(
                {'globalParameters':globalParam,'productCategorys': productList}), this.options)
            .map((response: Response) => {
                console.log(response);
                return true;
            }).catch((err) => this.errorHandling(err))
    }
    
    updateParameterStatus(status: string) {
        let headers = new Headers({ 'Authorization': 'Bearer ' 
            + this.authenticationService.token, 'Content-Type': 'application/json' },);
        this.options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.config.apiEndpoint}updateParameterStatus/${status}`,JSON.stringify({}), this.options)
            .map((response: Response) => {
                console.log(response);
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

        console.log("Error in calling  "+error);
        return Observable.throw(errMsg);

   }
    
}
