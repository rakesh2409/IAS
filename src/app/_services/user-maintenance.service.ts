import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { AuthenticationService } from '../_services/authentication.service';
import { UserMaintenanceModel } from '../_models/user-maintenance.model';
@Injectable()
export class UserMaintenanceService {
    constructor(
        @Inject(APP_CONFIG) private config: IAppConfig,
        private http: Http,
        private authenticationService: AuthenticationService) {
    }

    getUserList(): Observable<any> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' },);
        let options = new RequestOptions({ headers: headers });

        return this.http.get('http://localhost:8080/iasbackend/api/ias-users', options)
            .map((response: Response) => {
                console.log(response);
               return  response.json().data;
            });
    }
    
    
    isUserLoginIdValid(userLoginId: string): Observable<any> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' },);
        let options = new RequestOptions({ headers: headers });

        return this.http.get('http://localhost:8080/iasbackend/api/userLogIdValid/'+userLoginId , options)
            .map((response: Response) => {
               return  response.json().data;
            }).catch((err) => this.errorHandling(err))
    }
    
    getUserDetails(loginId: string, status: string): Observable<any> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' },);
        let options = new RequestOptions({ headers: headers });

        return this.http.get('http://localhost:8080/iasbackend/api/iasUserDetails/'+loginId+'/'+status , options)
            .map((response: Response) => {
                console.log(response);
               return  response.json();
            }).catch((err) => this.errorHandling(err))
    }
    
    getUserDetailsById(loginId: string): Observable<any> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' },);
        let options = new RequestOptions({ headers: headers });

        return this.http.get('http://localhost:8080/iasbackend/api/iasusersbyid/'+loginId, options)
            .map((response: Response) => {
                console.log(response);
               return  response.json();
            }).catch((err) => this.errorHandling(err))
    }

    createUser(userModel: UserMaintenanceModel): Observable<boolean> {
         let headers2 = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' },);
         return this.http.post("http://localhost:8080/iasbackend/api/ias-users", JSON.stringify( userModel ),{headers:headers2})
              .map((response: Response) => {
                  console.log(response);
                  let errorMessages = response.json().authenticationException;
                  return true;
              }).catch((err) => this.errorHandling(err))
    }
    
    updateUserRequest(userLoginId: string, status: string): Observable<boolean> {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' },);
         let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:8080/iasbackend/api/updateUserDetailsAccess/'+userLoginId+'/'+status,JSON.stringify({}), options)
             .map((response: Response) => {
                 console.log(response);
                 let errorMessages = response.json().authenticationException;
                 return true;
             }).catch((err) => this.errorHandling(err))
   }
   
    unlockData(userLoginId: string): Observable<boolean> {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' },);
         let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:8080/iasbackend/api/unLockUserDetailsData/'+userLoginId,JSON.stringify({}), options)
             .map((response: Response) => {
                 console.log(response);
                 let errorMessages = response.json().authenticationException;
                 return true;
             }).catch((err) => this.errorHandling(err))
   }
  
    deleteUser(userId: number) : Observable<boolean> {
       let headers2 = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' },);
       return this.http.delete("http://localhost:8080/iasbackend/api/ias-users/"+userId, {headers:headers2})
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