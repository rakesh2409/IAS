import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { ModuleConst } from '../../../data/const';
import {Logger} from  '../../_services/logger.service';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import { AuthenticationService } from '../../_services/authentication.service';
import {ErrorComponent} from '../../error/error.component';

@Injectable()
export class TopnavService {
    constructor(
        @Inject(APP_CONFIG) private config: IAppConfig,
        private http: Http,
        private authenticationService: AuthenticationService) {
    }
     getNotifications(userGroupId:number): Observable<any> {
     	let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' },);
        let options = new RequestOptions({ headers: headers });
        return this.http.get("http://localhost:8080/iasbackend/api/notificationForUG/"+userGroupId, options)
            .map((response: Response) => {
                console.log(response);
               return  response.json();
            });
     }
     
     
}