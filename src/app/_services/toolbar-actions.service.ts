import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class ToolBarService {
  private notify = new Subject<any>();
  notifyObservable$ = this.notify.asObservable();
  constructor() { }
  public notifyCurrentModule(data: any) {
    if (data) {
      this.notify.next(data);
    }
  }
  public notfyToolBar(data: any) {
    if (data) {
      this.notify.next(data);
    }
  }
  
  public setToolBarBehavior(data: any) {
    if (data) {
      this.notify.next(data);
    }
  }
}
