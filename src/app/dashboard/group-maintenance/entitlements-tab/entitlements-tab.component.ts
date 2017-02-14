import { Component, OnInit, Input } from '@angular/core';
import { GroupService } from '../../../_services/group-service';
import { UserAccessService } from '../../../_services/user-access.service';
import {Router, RouterModule,ActivatedRoute  } from '@angular/router';
import { GroupMaintenanceComponent } from '../group-maintenance.component';
import { Subscription } from 'rxjs/Subscription';
import { ToolBarService } from '../../../_services/toolbar-actions.service';

@Component({ 
  selector: 'app-entitlements-tab',
  templateUrl: './entitlements-tab.component.html',
  styleUrls: ['./entitlements-tab.component.css']
})
export class EntitlementsTabComponent implements OnInit {
  private moduleName: string;
  private moduleId: number;
  private subscription: Subscription;
  @Input() modules: Array<any>;
  @Input() moduleEntitlementList: Array<any>;
  @Input() entitlements: Array<any>;
  @Input() usergroupId: number;
  @Input() profiles: Array<any>;
  @Input() disableRecords: boolean;
  @Input() hideApprove:boolean;
  selectedRowModules: number;
  selectedRowProfiles: number;
  urlId : number;
  private groupId: number;
  private  availableModules = [];
  private assignedModuleList = [];
  constructor(
    public groupService: GroupService,
    private userAccessService: UserAccessService,
    private route: ActivatedRoute,
    private groupMaintenance: GroupMaintenanceComponent,
    private toolBarService: ToolBarService) { }

  ngOnInit() {
    this.disableRecords = true;
    this.hideApprove = true;
    this.updateToolBarBehavior();
    this.groupMaintenance.updateDisableRecords(this.disableRecords, this.hideApprove);
    this.subscription = this.toolBarService.notifyObservable$.subscribe((res) => {
      if (res.module === 'entitlements') {
        this.mapActions(res.option);
      }
    });
  }

  mapActions(option: string) {
    switch (option) {
      case 'add':
        console.log('add from ent');
        break;
      case 'save':
         console.log('save from ent');
        this.saveChanges();
        break;
      case 'delete':
        console.log('delete from ent');
        break;
    }
  }

  setClickedRowModules(i: number)  {
       this.selectedRowModules = i;
  }

  setClickedRowProfiles(i: number)  {
       this.selectedRowProfiles = i;
  }

 

  selectModuleById(moduleId: number) {
    this.moduleId = moduleId;
    for (let i = 0; i < this.moduleEntitlementList.length; i++) {
      if (this.moduleEntitlementList[i].moduleId === Number(moduleId)) {
        this.moduleName = this.moduleEntitlementList[i].description;
        this.entitlements = this.moduleEntitlementList[i].entitlement;
        break;
      }
    }
  }

  updateEntitlement(entId: number, newVal: string) {
    for (let i = 0; i < this.moduleEntitlementList.length; i++) {
      if (this.moduleEntitlementList[i].moduleId === Number(this.moduleId)) {
        this.entitlements = this.moduleEntitlementList[i].entitlement;
        for (let y = 0; y < this.entitlements.length; y++ ) {
          if (this.entitlements[y].entitlementId === Number(entId) ) {
            this.entitlements[y].accessCode = newVal;
            break;
          }
        }
        break;
      }
    }
  }

  saveChanges() {
     this.groupMaintenance.hideAlerts();
  	this.availableModules =[];
      for (let i = 0; i < this.modules.length; i++) {
        if (this.modules[i].availableModule) {
            let obj: Object = {
              moduleId: this.modules[i].moduleId
            };
            this.availableModules.push(obj);
        }
      }
      this.groupService.saveProfileModules(this.usergroupId, this.availableModules).subscribe(
        result => {
          if (result === true) {
                this.assignedModuleList = [];
			  	for (let i = 0; i < this.moduleEntitlementList.length; i++) {
			      for (let j = 0; j < this.modules.length; j++) {
			      		if(this.moduleEntitlementList[i].moduleId === this.modules[j].moduleId && this.modules[j].availableModule){
			      			this.assignedModuleList.push(this.moduleEntitlementList[i]);
			      			break;
			      		}
			      }
			    }
			    this.userAccessService.saveModulesEntitlements(this.usergroupId, this.assignedModuleList).subscribe(
			      result => {
			        if (result === true) {
		      		  this.groupMaintenance.updateMessages( null, null, 'Request Processed');
			        }
			      }, err => {
			          this.groupMaintenance.updateMessages( null, 'Failed to process the request.', null);
			      }
			    );
			    }
          
        }, err => {
           this.groupMaintenance.updateMessages( null, 'Failed to process the request.', null);
        }
      );
  
  }
  
  approveRequest(){
         this.groupMaintenance.hideAlerts();
  		this.groupService.updateStatus(this.usergroupId, "APPROVED").subscribe(
			      result => {
			        if (result === true) {
		      		  this.groupMaintenance.updateMessages(null, null, 'Request Processed');
			          this.disableRecords = false;
				      this.hideApprove = true;
		      		  this.groupMaintenance.updateDisableRecords(this.disableRecords , this.hideApprove);
		      		  this.updateToolBarBehavior();
			        }
			      }, err => {
			          this.groupMaintenance.updateMessages( null, 'Failed to process the request.', null);
			      }
			    );
  }
  
  rejectRequest(){
         this.groupMaintenance.hideAlerts();
  		this.groupService.updateStatus(this.usergroupId, "REJECTED").subscribe(
			      result => {
			        if (result === true) {
		      		  this.groupMaintenance.updateMessages( null,  null, 'Request Processed');
			          this.disableRecords = false;
				      this.hideApprove = true;
				      this.updateToolBarBehavior();
		      		  this.groupMaintenance.updateDisableRecords(this.disableRecords , this.hideApprove);
		      		  this.modules = [];
				      //this.groupId = this.usergroupId;
				      this.groupService.getModulesByProfileId(this.usergroupId,'APPROVED')
				        .subscribe(items => {
				           this.modules = items.data;
				           this.groupMaintenance.updateModules(this.modules);
				        });
				        
				      this.groupService.getModulesEntitlements(this.usergroupId, 'APPROVED')
						        .subscribe(items => {
						          this.moduleEntitlementList = items.data.module;
						          this.groupMaintenance.updateModuleEntitlements(items.data.module);
								  this.disableRecords = items.disableRecord;
								   this.hideApprove = items.hideApprove;
						          this.groupMaintenance.updateDisableRecords(items.disableRecord, items.hideApprove);
						        });
					  this.groupMaintenance.updateGroupId(this.usergroupId);
					  this.entitlements = [];
				      this.groupMaintenance.updateEntitlements(this.entitlements);
			        }
			      }, err => {
			         this.groupMaintenance.updateMessages( null, 'Failed to process the request.', null);
			      }
			    );
  }
  
  unlockData(){
  		this.groupService.unLockData(this.usergroupId).subscribe(
			      result => {
			        if (result === true) {
			          this.hideApprove = true;
			        }
			      }, err => {
			          this.groupMaintenance.updateMessages( null, 'Failed to process the request.', null);
			      }
			    );
  }
  
  updateToolBarBehavior() {
      this.toolBarService.setToolBarBehavior({disable:this.disableRecords});
  }

}
