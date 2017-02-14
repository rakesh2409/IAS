import { IAppConfig, APP_CONFIG } from '../app.config'
import { AuthenticationService } from './authentication.service'
import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';




@Injectable()
export class ClientEnumReferenceService {
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

  //   createUser(clientModel: Client): Observable<boolean> {
  //         let headers2 = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' },);
  //         return this.http.post("http://localhost:8080/iasbackend/api/ias-users", JSON.stringify( clientModel ),{headers:headers2})
  //              .map((response: Response) => {
  //                  console.log(response);
  //                  let errorMessages = response.json().authenticationException;
  //                  return true;
  //              }).catch((err) => this.errorHandling(err))
  //    }

  getEducationLevel(): Observable<any> {
    this.enumRefCatCode = 1015;
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' }, );
    let options = new RequestOptions({ headers: headers });
    return this.http.get("http://localhost:8080/iasadvisory/api/multipleEnumRefCodes/" + this.enumRefCatCode, options)
      .map((response: Response) => {
        console.log(response);
        return response.json();
      });
  }

  getSalutation(): Observable<any> {
    this.enumRefCatCode = 1017;
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' }, );
    let options = new RequestOptions({ headers: headers });
    return this.http.get("http://localhost:8080/iasbackend/api/multipleEnumRefCodes/" + this.enumRefCatCode, options)
      .map((response: Response) => {
        console.log(response);
        return response.json();
      });
  }

  getSegment(): Observable<any> {
    this.enumRefCatCode = 1019;
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' }, );
    let options = new RequestOptions({ headers: headers });
    return this.http.get("http://localhost:8080/iasbackend/api/multipleEnumRefCodes/" + this.enumRefCatCode, options)
      .map((response: Response) => {
        console.log(response);
        return response.json();
      });
  }

  getCountry(): Observable<any> {
    this.enumRefCatCode = 1021;
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' }, );
    let options = new RequestOptions({ headers: headers });
    return this.http.get("http://localhost:8080/iasbackend/api/multipleEnumRefCodes/" + this.enumRefCatCode, options)
      .map((response: Response) => {
        console.log(response);
        return response.json();
      });
  }

  getEmploymentStatus(): Observable<any> {
    this.enumRefCatCode = 1012;
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' }, );
    let options = new RequestOptions({ headers: headers });
    return this.http.get("http://localhost:8080/iasbackend/api/multipleEnumRefCodes/" + this.enumRefCatCode, options)
      .map((response: Response) => {
        console.log(response);
        return response.json();
      });
  }

  getIDType(): Observable<any> {
    this.enumRefCatCode = 1025;
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' }, );
    let options = new RequestOptions({ headers: headers });
    return this.http.get("http://localhost:8080/iasbackend/api/multipleEnumRefCodes/" + this.enumRefCatCode, options)
      .map((response: Response) => {
        console.log(response);
        return response.json();
      });
  }


  getAllDropDownValues(): Observable<any> {
    this.allDropDownValues.push(1012, 1015, 1017, 1019, 1021, 1025);
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token, 'Content-Type': 'application/json' }, );
    let options = new RequestOptions({ headers: headers });
    return this.http.get("http://localhost:8080/iasbackend/api/multipleEnumRefCodes/" + this.allDropDownValues, options)
      .map((response: Response) => {
        console.log(response);
        return response.json();
      });
  }

}
