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
export class CheckerMakerService {
    headers: Headers;
    constructor(
        @Inject(APP_CONFIG) private config: IAppConfig,
        private http: Http,
        private authenticationService: AuthenticationService) {
            this.headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token,
                'Content-Type': 'application/json' },);
        }
    
     getCheckerMakerQueue(): Observable<any> { 
        let options = new RequestOptions({ headers: this.headers });
        return this.http.get("http://localhost:8080/iasbackend/api/notificationForUG/"+JSON.parse(localStorage.getItem('user')).userGroupId, options)
            .map((response: Response) => {
                console.log(response);
               return  response.json();
            });
     }
}