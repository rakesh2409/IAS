import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { APP_CONFIG, IAppConfig } from '../app.config';

import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user';

@Injectable()
export class UserService {
    constructor(
        @Inject(APP_CONFIG) private config: IAppConfig,
        private http: Http,
        private authenticationService: AuthenticationService) {
    }
    getUsers(): Observable<any> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' },);
        let options = new RequestOptions({ headers: headers });

        // get users from api
        return this.http.get(`${this.config.apiEndpoint}users`, options)
            .map((response: Response) => {
                console.log(response);
               return  response.json();

            });
    }
    getUserMenus(): Observable<any>{
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' },);
        let options = new RequestOptions({ headers: headers });
        return this.http.get(`${this.config.apiEndpoint}menuList`, options)
            .map((response: Response) => {
                console.log(response);
               return  response.json();
            });
    }

    getUserComponents(loginName: string): Observable<any> {
      let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' },);
        let options = new RequestOptions({ headers: headers });
        return this.http.get(`${this.config.apiEndpoint}userDetails/` + loginName, options)
            .map((response: Response) => {
                console.log(response);
               return  response.json();
            });
    }

}
