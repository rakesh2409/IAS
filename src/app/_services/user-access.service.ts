import { Injectable, Inject, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { ModuleConst } from '../../data/const';
import {Logger} from  './logger.service';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { AuthenticationService } from '../_services/authentication.service';
import {ErrorComponent} from '../error/error.component';
@Injectable()
export class UserAccessService {
    private post_headers = new Headers({'Content-Type': 'application/json'});
    public logger: Logger;
    public errorMessages: string;
    elements: Array<any>;
    modules: Array<any>;
    constructor(
        @Inject(APP_CONFIG) private config: IAppConfig,
        private http: Http,
        private authenticationService: AuthenticationService
    ) { }

    getUserAccess(): Observable<any> {
      let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' },);
      let options = new RequestOptions({ headers: headers });
      return this.http.get(`${this.config.apiEndpoint}moduleCompAccess/101000/APPROVED`, options)
        .map((response: Response) => {
          console.log(response);
            return  response.json();
        });
    }
    getModules(): Observable<any> {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' },);
        let options = new RequestOptions({ headers: headers });

        return this.http.get(`${this.config.apiEndpoint}moduleCompAccess/101000/APPROVED`, options)
            .map((response: Response) => {
                console.log(response);
               return  response.json();
            });
    }
    saveModulesEntitlements(usergroup: number, modules: Array<any>): Observable<boolean> {
      let headers2 = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' },);
      return this.http.post(`${this.config.apiEndpoint}saveUserAccess`,
        JSON.stringify({ usergroupId: usergroup, module: modules }),{headers:headers2})
            .map((response: Response) => {
                console.log(response);
                let errorMessages = response.json().authenticationException;
                return true;
            }).catch((err) => this.errorHandling(err))
    }
    /*  author: Ricardo F.
     *  generic function for setting access level for elements
     *  param container: parent element
     *  param components: array of components from json
     *  param moduleCode: name of module
     */
    setAccessLevel(container: ElementRef, obj: Array<any>, moduleCode: string): void {
          for (let y = 0; y < obj.length; y++) {
            if (obj[y].moduleCode === moduleCode) {
              this.modules = obj[y].component;
                for(let x = 0; x < this.modules.length; x++) {
                  switch (this.modules[x].accessCode) {
                    case ModuleConst.getInstance().READ:
                      this.disableElement(container, this.modules[x].name);
                      break;
                    case ModuleConst.getInstance().READ_WRITE:
                      break;
                    case ModuleConst.getInstance().HIDDEN:
                      this.hideElement(container, this.modules[x].name);
                      break;
                    }
               }
           }
      }
    }
    enableElement(container: ElementRef, elName: string): void {
      container.nativeElement.querySelector(elName).removeAttribute('disabled', 'disabled');
    }
    disableElement(container: ElementRef, elName: string): void {
      container.nativeElement.querySelector(elName).setAttribute('disabled', 'disabled');
    }
    hideElement(container: ElementRef, elName: string): void {
      container.nativeElement.querySelector(elName).style.display = 'none';
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
