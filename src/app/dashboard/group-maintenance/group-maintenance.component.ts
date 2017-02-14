import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GroupService } from '../../_services/group-service';
import {Router, RouterModule,ActivatedRoute  } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ToolBarService } from '../../_services/toolbar-actions.service';
import { ErrorComponent } from '../../error/error.component';

@Component({
  selector: 'app-group-maintenance',
  templateUrl: './group-maintenance.component.html',
  styleUrls: ['./group-maintenance.component.css'],
    providers: [RouterModule ] 
})
export class GroupMaintenanceComponent implements OnInit, AfterViewInit {
  private subscription: Subscription;
  constructor( private groupService: GroupService,
     private route: ActivatedRoute,
     private toolBarService: ToolBarService, private errorHandler: ErrorComponent) { }
  profiles: Array<any>;
  modules: Array<any>;
  moduleEntitlementList: Array<any>;
  usergroupId: number;
  private sub: any; 
  moduleId : Number;
  entitlements: Array<any>;
  disableRecords = false;
  hideApprove = false;
  error: string;
  successMsg: string;
  infoMsg: string; 
  ngOnInit() {
    this.hideAlerts();
    this.sub = this.route
        .params
        .subscribe(params => {
            this.moduleId = params['id']; // --> Name must match wanted paramter
    });

    /*this.groupService.getProfiles()
            .subscribe(items => {
                this.profiles = items;
            });*/
    this.modules = [];
  }

  ngAfterViewInit() {
    this.setActiveTab('profiles');
  }

  setActiveTab(tab: string) {
    this.toolBarService.notfyToolBar({module: tab});
  }

  updateProfiles(profiles: Array <any>) {
    this.profiles = profiles;
  }

  updateModules(modules: Array<any>){
  	this.modules = modules;
  }

   updateModuleEntitlements(moduleEntitlementList: Array<any>){
  	this.moduleEntitlementList = moduleEntitlementList;
  }
  
   updateGroupId( usergroupId: number){
  	this.usergroupId = usergroupId;
  }
  
   updateEntitlements(entitlements: Array<any>){
  	this.entitlements = entitlements;
  }
  
  updateDisableRecords(disableRecords: boolean, hideApprove: boolean){
  	this.disableRecords = disableRecords;
  	this.hideApprove = hideApprove;
  }
  
  updateMessages(infoMsg : string, error:string, successMsg: string){
   	  this.infoMsg = infoMsg;
      this.error = error;
      this.successMsg = successMsg;
  }
  
   hideAlerts() {
      this.infoMsg = null;
      this.error = null;
      this.successMsg = null;
    }

}
