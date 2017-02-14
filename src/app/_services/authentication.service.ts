import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import {URLSearchParams} from '@angular/http';
import {Logger} from  './logger.service';
import { APP_CONFIG, IAppConfig } from '../app.config';
import {ErrorComponent} from '../error/error.component';
@Injectable()
export class AuthenticationService {
  public logger : Logger;
  public token: string;
  rememberme  = true;
  search = new URLSearchParams();
  public errorMessages : string;
  private headers = new Headers({'Content-Type': 'application/json'});

    constructor(
      @Inject(APP_CONFIG) private config: IAppConfig,
      private http: Http,
      private errormsg : ErrorComponent

    ) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;

    }

    login(username: string, password: string): Observable<boolean> {

        return this.http.post(`${this.config.apiEndpointAuth}authenticate`, JSON.stringify({ username: username ,rememberMe : this.rememberme, password: password }),{headers:this.headers})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                //this.logger.log(response.toString());
                console.log(response);
                let token = response.json() && response.json().id_token;
                let errorMessages = response.json().authenticationException
                console.log(token);
                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login

                    return false;

                }
            }).catch((err) => this.errorHandling(err))
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('cache_components');
        localStorage.removeItem('user');
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
