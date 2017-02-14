import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, RouterModule,ActivatedRoute  } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { VulnTriggerService } from '../../_services/vuln-triggers.service';
import { ToolBarService } from '../../_services/toolbar-actions.service';
@Component({
  selector: 'app-vuln-triggers',
  templateUrl: './vuln-triggers.component.html',
  styleUrls: ['./vuln-triggers.component.css']
})
export class VulnTriggersComponent implements OnInit, AfterViewInit {
  private subscription: Subscription;
  private moduleName = 'vuln-triggers';
  private triggerValues: Array<any>;  
  private disableRecord = false;
  private hideApproveReject = true;
  private statusCode: string;
  private successMsg : string;
  private infoMsg: string;
  private error: string;
  constructor(private triggerService: VulnTriggerService,
              private toolBarService: ToolBarService,
              private route: ActivatedRoute) {}

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
      this.subscription = this.toolBarService.notifyObservable$.subscribe((res) => {
          if (res.module === this.moduleName) {
            this.mapActions(res.option);
          }
      });
  }
  
  ngAfterViewInit() {
      this.fetchData();
      this.toolBarService.notfyToolBar({module: this.moduleName});
  }
  
  private updateToolBarBehavior(): void {
      this.toolBarService.setToolBarBehavior({disable:this.disableRecord});
  }
  
  private fetchData(): void {
      this.triggerService.getTriggerValues(this.statusCode).subscribe(
              result => {
                  this.triggerValues = result.data;
                  this.disableRecord = result.disableRecord;
                  this.updateToolBarBehavior();
                  this.hideApproveReject = result.hideApprove;
                  if(result.messages !== null && result.messages.length > 0 ) {
                      this.infoMsg = result.messages[0];
                  }
              });
  }
  
  getData() {
      console.log(JSON.stringify(this.triggerValues));
  }
  
  private clearMsgs(): void {
      this.successMsg = '';
      this.error = '';
      this.infoMsg = '';
  }
  
  private mapActions(action: string): void {
      switch(action) {
      case 'save':
          console.log(JSON.stringify(this.triggerValues));
          this.triggerService.updateTriggerValues(this.triggerValues).subscribe( result =>{
              if(result){
                  this.successMsg = "Vulnerable Trigger values saved. Awaiting for approval changes.";
              }}, err => {
                  this.error = err;
          });
      }
  }
  
  private updateRequest(status: string): void {
      this.clearMsgs();
      this.triggerService.updateTriggerStatus(status).subscribe(
              result => {
                  if(result) {
                      this.successMsg = "Vulnerable Trigger change request was successfully "+status+".";
                      this.statusCode = 'APPROVED';
                      this.fetchData();
                  }}, err => {
                      this.error = err;
                  });
  }

}
