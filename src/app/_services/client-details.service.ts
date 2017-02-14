import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { ModuleConst } from '../../data/const';
import { ClientModel } from '../_models/client.model';
import { Logger } from '../_services/logger.service';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { AuthenticationService } from '../_services/authentication.service';
import { ErrorComponent } from '../error/error.component';



@Injectable()
export class ClientDetailsService {
  private enumRefCatCode: number;
  private allDropDownValues = [];

  constructor(
    @Inject(APP_CONFIG) private config: IAppConfig,
    private http: Http,
    private authenticationService: AuthenticationService) {
  }


  private errorHandling(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    console.log("authentication service  " + error);
    return Observable.throw(errMsg);

  }
  getClientDetailsByIdOrName(clientId: string, clientName: string): Observable<any> {
    // add authorization header with jwt token
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' }, );
    let options = new RequestOptions({ headers: headers });


    return this.http.get('http://localhost:8080/iasadvisory/api/client/' + clientId + '/' + clientName, options)
      .map((response: Response) => {
        console.log(response);
        return response.json();
      }).catch((err) => this.errorHandling(err))
  }

  getJointSearchDetails(listOfJoints: Array<any>): Observable<any> {
    let headers2 = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' }, );
    return this.http.post("http://localhost:8080/iasadvisory/api/searchClient", JSON.stringify(listOfJoints), { headers: headers2 })
      .map((response: Response) => {
        console.log(response);
        return response.json();
      }).catch((err) => this.errorHandling(err))
  }


  saveClientModelInd(clientModel: ClientModel): Observable<any> {
    let headers2 = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' }, );
    return this.http.post("http://localhost:8080/iasadvisory/api/client", JSON.stringify(clientModel), { headers: headers2 })
      .map((response: Response) => {
        console.log(response);
        return response.json();
      }).catch((err) => this.errorHandling(err))
  }

  getClientDetailsById(clientId: string): Observable<any> {
    // add authorization header with jwt token
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' }, );
    let options = new RequestOptions({ headers: headers });


    return this.http.get('http://localhost:8080/iasadvisory/api/clientById/' + clientId , options)
      .map((response: Response) => {
        console.log(response);
        return response.json();
      }).catch((err) => this.errorHandling(err))
  }
}
