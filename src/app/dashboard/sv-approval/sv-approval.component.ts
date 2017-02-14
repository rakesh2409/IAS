import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, RouterModule,ActivatedRoute  } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SvApprovalService } from '../../_services/sv-approval.service';
import { ToolBarService } from '../../_services/toolbar-actions.service';
@Component({
  selector: 'app-sv-approval',
  templateUrl: './sv-approval.component.html',
  styleUrls: ['./sv-approval.component.css']
})
export class SvApprovalComponent implements OnInit, AfterViewInit {
 private subscription: Subscription;
 private moduleName = 'sv-approval';
 private svApprovalValues: Array<any>;  
 private disableRecord = false;
 private hideApproveReject = true;
 private statusCode: string;
 private successMsg : string;
 private infoMsg: string;
 private error: string;
  constructor(private svService: SvApprovalService,
              private toolBarService: ToolBarService,
              private route: ActivatedRoute) { }

  ngOnInit() {
      this.route
      .params
      .subscribe(params => {
          if(params !== null){
              if (params['id'] === '1') {
                  this.statusCode = 'SUBMITTED';
              }else{
                  this.statusCode = 'APPROVED';
              }
          }else{
              this.statusCode = 'APPROVED';
          }          
      });   
      this.subscription = this.toolBarService.notifyObservable$.subscribe((res) => {
          if (res.module === this.moduleName) {
            this.mapActions(res.option);
            console.log(res.option);
          }
      });
  }
  
  ngAfterViewInit() {
      this.fetchData();
      this.toolBarService.notfyToolBar({module: this.moduleName});
  }
  
  private fetchData(): void {
      this.svService.getSvApprovalValues(this.statusCode).subscribe(
              result => {
                  this.svApprovalValues = result.data;
                  this.disableRecord = result.disableRecord;
                  this.updateToolBarBehavior();
                  this.hideApproveReject = result.hideApprove;
                  if(result.messages !== null && result.messages.length > 0 ) {
                      this.infoMsg = result.messages[0];
                  }
              });
  }
  
  private updateRequest(status: string): void {
      this.clearMsgs();
      this.svService.updateSvApprovalStatus(status).subscribe(
              result => {
                  if(result) {
                      this.successMsg = "SV Approval values change request was successfully "+status+".";
                      this.statusCode = 'APPROVED';
                      this.fetchData();
                  }}, err => {
                      this.error = err;
                  });
  }
  
  private updateToolBarBehavior(): void {
      this.toolBarService.setToolBarBehavior({disable:this.disableRecord});
  }
  
  private clearMsgs(): void {
      this.successMsg = '';
      this.error = '';
      this.infoMsg = '';
  }
  
  private mapActions(action: string): void {
      this.clearMsgs();
      switch(action) {
      case 'save':
          console.log(JSON.stringify(this.svApprovalValues));
          this.svService.updateSvApprovalValues(this.svApprovalValues).subscribe( result =>{
              if(result){
                  this.successMsg = "SV Approval values saved. Awaiting for approval changes.";
              }}, err => {
                  this.error = err;
          });
      }
  }
  
}
