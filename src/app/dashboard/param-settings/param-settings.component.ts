import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, RouterModule,ActivatedRoute  } from '@angular/router';
import { ParamSettingsService } from '../../_services/param-settings.service';
import { Subscription } from 'rxjs/Subscription';
import { ToolBarService } from '../../_services/toolbar-actions.service';
@Component({
  selector: 'app-param-settings',
  templateUrl: './param-settings.component.html',
  styleUrls: ['./param-settings.component.css']
})
export class ParamSettingsComponent implements OnInit, AfterViewInit, OnDestroy {
  private productList: Array<any>;
  private globalParamData: Array<any>;
  private disableRecord = false;
  private hideApproveReject = true;
  private subscription: Subscription;
  private moduleName = 'param-settings';
  private statusCode : string;
  private successMsg : string;
  private error: string;
  constructor(private paramSettingsService: ParamSettingsService, 
              private toolBarService: ToolBarService,
              private route: ActivatedRoute) { }

  ngOnInit() {     
      this.route
      .params
      .subscribe(params => {
          if (params['id'] === '1') {
              this.statusCode = 'SUBMITTED';
          }else{
              this.statusCode = 'APPROVED';
          }
      });          
      this.fetchData();
      this.subscription = this.toolBarService.notifyObservable$.subscribe((res) => {
          if (res.module === this.moduleName) {
            this.mapActions(res.option);
            console.log(res.option);
          }
      });
  }
  
  ngAfterViewInit() {
      this.toolBarService.notfyToolBar({module: this.moduleName});
  }
  
  ngOnDestroy() {
      this.subscription.unsubscribe();
  }
  
  private updateToolBarBehavior(): void {
      this.toolBarService.setToolBarBehavior({disable:this.disableRecord});
  }
  
  private clearMsgs(): void {
      this.successMsg = '';
      this.error = '';
  }
  
  private fetchData(): void {      
      this.paramSettingsService.getGlobalParameter(this.statusCode).subscribe(result => {
          this.globalParamData = result.data;
          this.disableRecord = result.disableRecord;
          this.hideApproveReject = result.hideApprove;   
          this.updateToolBarBehavior();
      });
      
      this.paramSettingsService.getProductList(this.statusCode).subscribe(result => {
          this.productList = result;
      });
  }
  
  private updateRequest(status: string): void {
      this.clearMsgs();
      this.paramSettingsService.updateParameterStatus(status).subscribe(
              result => {
                  if(result) {
                      this.successMsg = "Parameter Settings change request was successfully "+status+".";
                      this.statusCode = 'APPROVED';
                      this.fetchData();
                  }}, err => {
                      this.error = err;
                  });
  }
  
  private mapActions(action: string): void {
      switch(action) {
      case 'save':
          console.log(JSON.stringify({'globalParameters':this.globalParamData,'productCategorys': this.productList}));
          this.paramSettingsService.saveGlobalParameter(this.globalParamData,this.productList).subscribe( result =>{
              if(result){
                  this.successMsg = "Global Parameter info saved.";
              }}, err => {
                  this.error = err;
          });
      }
  }
  
  edit() {}

}
