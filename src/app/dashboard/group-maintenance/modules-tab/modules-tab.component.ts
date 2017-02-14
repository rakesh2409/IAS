import { Component, OnInit, OnChanges, Input, SimpleChanges, ViewChild } from '@angular/core';
import { GroupService } from '../../../_services/group-service';
import { UserAccessService } from '../../../_services/user-access.service';
import { ModuleConst } from '../../../../data/const';
import { Router, RouterModule,ActivatedRoute  } from '@angular/router';
import { GroupMaintenanceComponent } from '../group-maintenance.component';
import { Subscription } from 'rxjs/Subscription';
import { ToolBarService } from '../../../_services/toolbar-actions.service';

@Component({
  selector: 'app-modules-tab',
  templateUrl: './modules-tab.component.html',
  styleUrls: ['./modules-tab.component.css']
})
export class ModulesTabComponent implements OnInit, OnChanges {
  private subscription: Subscription;
  @ViewChild('container') container;
  @Input()
  modules: Array<any>;
  @Input()
  moduleEntitlementList: Array<any>;
  @Input()
  usergroupId: number;
  private availableModules = [];
  private moduleId: number;
  private groupId: number;
  selectedRowProfile: number;
  selectedRowModule: number;
  @Input()
  profiles: Array<any>;
    @Input()
  entitlements: Array<any>;
   @Input()
   disableRecords : boolean;
   @Input()
   hideApprove:boolean;
  mod: any;
  urlId : number;
  constructor(
    public groupService: GroupService, private route: ActivatedRoute, private  groupMaintenance: GroupMaintenanceComponent,
    private toolBarService: ToolBarService
    ) {}
    ngOnInit() {
        this.groupMaintenance.hideAlerts();
    	this.route
	        .params
	        .subscribe(params => {
	            this.urlId = params['id'];
    	});
    	if(this.urlId != 0){
    	     this.disableRecords = false;
    	     this.hideApprove = false;
    		 this.modules = [];
		     this.groupId = this.urlId;
		     this.groupService.getModulesByProfileId(this.groupId,'SUBMITTED')
		        .subscribe(items => {
		           this.modules = items.data;
		           this.groupMaintenance.updateModules(this.modules);
		        });
		        
		      this.groupService.getModulesEntitlements(this.groupId, 'SUBMITTED')
				        .subscribe(items => {
				          this.moduleEntitlementList = items.data.module;
				          this.groupService.getProfilesByName(items.data.userGroupName)
					            .subscribe(items => {
					                this.profiles = items.data;
					                this.groupMaintenance.updateProfiles(this.profiles);
					            });     
				          this.groupMaintenance.updateModuleEntitlements(items.data.module);
				          this.disableRecords = items.disableRecord;
				          this.hideApprove = items.hideApprove;
		      			  this.groupMaintenance.updateDisableRecords(items.disableRecord, items.hideApprove);
		      			  if(items['messages'] != null && items['messages'].length > 0){
		      			  	 this.groupMaintenance.updateMessages( items['messages'][0], null, null);
		      			  }
		      			  this.updateToolBarBehavior();
				        });
			  this.usergroupId = this.groupId; 
			  this.groupMaintenance.updateGroupId(this.usergroupId);
			  this.entitlements = [];
		      this.groupMaintenance.updateEntitlements(this.entitlements);
		      this.groupMaintenance.setActiveTab('modules');
    	}
    }
    ngOnChanges(changes: SimpleChanges) {}

    getModulesByProfileId(groupId: number) {
      this.groupMaintenance.hideAlerts();
      this.disableRecords = false;
      this.hideApprove = false;
      this.modules = [];
      console.log('groupId: ' +groupId);
      this.groupId = groupId;
      this.groupService.getModulesByProfileId(groupId,'APPROVED')
        .subscribe(items => {
           this.modules = items.data;
           this.groupMaintenance.updateModules(this.modules);
        });
        
      this.groupService.getModulesEntitlements(groupId, 'APPROVED')
		        .subscribe(items => {
		          this.moduleEntitlementList = items.data.module;
		          this.groupMaintenance.updateModuleEntitlements(items.data.module);
				  this.disableRecords = items.disableRecord;
				  this.hideApprove = items.hideApprove;
		          this.groupMaintenance.updateDisableRecords(items.disableRecord, items.hideApprove);
		          if(items['messages'] != null && items['messages'].length > 0){
		      			  	 this.groupMaintenance.updateMessages( items['messages'][0], null, null);
		      	  }
		      	  this.updateToolBarBehavior();
		        });
	  this.usergroupId = groupId; 
	  this.groupMaintenance.updateGroupId(this.usergroupId);
	  this.entitlements = [];
      this.groupMaintenance.updateEntitlements(this.entitlements);
    }

    setClickedRowModule(i: number)  {
       this.selectedRowModule = i;
    }

    setClickedRowProfile(i: number)  {
       this.selectedRowProfile = i;
    }

    holdValue(moduleId: number) {
      this.moduleId = moduleId;
    }

    modifyModules(status: string) {
      this.availableModules = [];
      switch (status) {
        case ModuleConst.getInstance().ASSIGN:
          this.modifySingleModule(true);
          break;
        case ModuleConst.getInstance().REM_ASSIGNED:
          this.modifySingleModule(false);
          break;
        case ModuleConst.getInstance().ASSIGN_ALL:
          this.modifyMultipleModules(true);
          break;
        case ModuleConst.getInstance().REM_ALL_ASSIGNED:
          this.modifyMultipleModules(false);
          break;
      }
      this.entitlements = [];
       this.groupMaintenance.updateEntitlements(this.entitlements);
    }

    modifySingleModule(available: boolean) {
      for (let i = 0; i < this.modules.length; i++) {
        if (this.modules[i].moduleId === Number(this.moduleId)) {
            this.modules[i].availableModule = available;
            break;
        }
      }
    }

    modifyMultipleModules(available: boolean) {
      for (let i = 0; i < this.modules.length; i++) {
        if (this.modules[i].availableModule !== available) {
            this.modules[i].availableModule = available;
        }
      }
    }
    
    updateToolBarBehavior() {
      this.toolBarService.setToolBarBehavior({disable:this.disableRecords});
    }
    
}