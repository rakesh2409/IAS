import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { ModuleConst } from '../../data/const';
import {Logger} from  '../_services/logger.service';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { AuthenticationService } from '../_services/authentication.service';
import {ErrorComponent} from '../error/error.component';

@Injectable()
export class GroupService {
    constructor(
        @Inject(APP_CONFIG) private config: IAppConfig,
        private http: Http,
        private authenticationService: AuthenticationService) {
    }
     getProfiles(): Observable<any> {
      let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' },);
        let options = new RequestOptions({ headers: headers });
        return this.http.get("http://localhost:8080/iasbackend/api/user-groups", options)
            .map((response: Response) => {
                console.log(response);
               return  response.json();
            });
     }
     
      getProfilesByName(searchParam : string): Observable<any> {
      let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' },);
        let options = new RequestOptions({ headers: headers });
        return this.http.get("http://localhost:8080/iasbackend/api/getUserGroupsByName/"+searchParam, options)
            .map((response: Response) => {
                console.log(response);
               return  response.json();
            });
     }
     
     
     getModulesEntitlements(groupId: number, status: string): Observable<any> {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' },);
        let options = new RequestOptions({ headers: headers });

        return this.http.get('http://localhost:8080/iasbackend/api/moduleEntAccess/'+groupId+'/'+status, options)
            .map((response: Response) => {
                console.log(response);
               return  response.json();
            });
    }
     
     getValidUserGroupName(groupName :  string): Observable<any> {
      let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' },);
        let options = new RequestOptions({ headers: headers });
        return this.http.get("http://localhost:8080/iasbackend/api/userGroupNameValid/"+groupName, options)
            .map((response: Response) => {
                console.log(response);
               return  response.json();
            });
     }

     getModulesByProfileId(groupId: number, status: string): Observable<any> {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' },);
        let options = new RequestOptions({ headers: headers });

        return this.http.get("http://localhost:8080/iasbackend/api/userGroupModules/"+groupId+"/"+status, options)
            .map((response: Response) => {
                console.log(response);
               return  response.json();
            });
     }
     
      saveUserGroup(profileName:string, supervisorLevel:string): Observable<boolean> {
       let headers2 = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' },);
       return this.http.post("http://localhost:8080/iasbackend/api/user-groups", JSON.stringify({ usergroupName: profileName, supervisorLevel: supervisorLevel }),{headers:headers2})
            .map((response: Response) => {
                console.log(response);
                let errorMessages = response.json().authenticationException;
                return true;
            }).catch((err) => this.errorHandling(err))
     }
     
     saveProfileModules(groupId: number, modules: Array<any>): Observable<boolean> {
       let headers2 = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' },);
       console.log(JSON.stringify({ usergroupId: groupId, module: modules }),{headers:headers2});
       return this.http.post("http://localhost:8080/iasbackend/api/saveUserModuleAccess", JSON.stringify({ usergroupId: groupId, module: modules }),{headers:headers2})
            .map((response: Response) => {
                console.log(response);
                let errorMessages = response.json().authenticationException;
                return true;
            }).catch((err) => this.errorHandling(err))
     } 
     
      updateStatus(usergroupId:number, status:string): Observable<boolean> {
       let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' },);
       let options = new RequestOptions({ headers: headers });
       return this.http.post("http://localhost:8080/iasbackend/api/updateUserAccess/"+usergroupId+"/"+status,JSON.stringify({}), options)
            .map((response: Response) => {
                console.log(response);
                let errorMessages = response.json().authenticationException;
                return true;
            }).catch((err) => this.errorHandling(err))
     }
     
     unLockData(usergroupId:number): Observable<boolean> {
       let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' },);
       let options = new RequestOptions({ headers: headers });
       return this.http.post("http://localhost:8080/iasbackend/api/unLockData/"+usergroupId,JSON.stringify({}), options)
            .map((response: Response) => {
                console.log(response);
                let errorMessages = response.json().authenticationException;
                return true;
            }).catch((err) => this.errorHandling(err))
     }
     
     saveEditedUserGroup(profileName:string, supervisorLevel:string, usergroupId:number): Observable<boolean> {
       let headers2 = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' },);
       return this.http.put("http://localhost:8080/iasbackend/api/user-groups", JSON.stringify({ usergroupName: profileName, supervisorLevel: supervisorLevel, usergroupId : usergroupId }),{headers:headers2})
            .map((response: Response) => {
                console.log(response);
                let errorMessages = response.json().authenticationException;
                return true;
            }).catch((err) => this.errorHandling(err))
     }
     
      isDeletePossible(usergroupId :  number): Observable<any> {
      let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' },);
        let options = new RequestOptions({ headers: headers });
        return this.http.get("http://localhost:8080/iasbackend/api/deleteValidation/"+usergroupId, options)
            .map((response: Response) => {
                console.log(response);
               return  response.json();
            });
     }
     
     deleteUserGroup(usergroupId:number): Observable<boolean> {
       let headers2 = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' },);
       return this.http.delete("http://localhost:8080/iasbackend/api/user-groups/"+usergroupId, {headers:headers2})
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
  
         console.log("authentication service  "+error);
         return Observable.throw(errMsg);
  
    }
}