import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { GroupService } from '../../../_services/group-service';
import { GroupMaintenanceComponent } from '../group-maintenance.component';
import { UserAccessService } from '../../../_services/user-access.service';
import { Subscription } from 'rxjs/Subscription';
import { ToolBarService } from '../../../_services/toolbar-actions.service';
@Component({
  selector: 'app-profiles-tab',
  templateUrl: './profiles-tab.component.html',
  styleUrls: ['./profiles-tab.component.css']
})

export class ProfilesTabComponent implements OnInit {
  private subscription: Subscription;
  model: any= {};
  disableSave: true;
  profileNames: string = '';
  pF: string;
  svLevel: string;
  svLevels: string = '';
  @Input()
  profiles: Array<any>;
  @Input()
  modules: Array<any>;
   @Input()
  entitlements: Array<any>;
  selectedRowProfile: number;
  disableEdit: boolean;
  selectedUserGroupId : number;
  constructor( private groupservice: GroupService,
    private userAccessService: UserAccessService,
    private  groupMaintenance: GroupMaintenanceComponent,
    private toolBarService: ToolBarService) { }

  ngOnInit() {
    this.groupMaintenance.hideAlerts();
    this.disableEdit = true;
    this.profileNames = "";
    this.svLevels = "";
    this.selectedUserGroupId = 0;

    this.subscription = this.toolBarService.notifyObservable$.subscribe((res) => {
      if (res.module === 'profiles') {
        this.mapActions(res.option);
      }
    });
    this.toolBarService.setToolBarBehavior({disable:true});

  }

  mapActions(option: string) {
    switch (option) {
      case 'add':
        break;
      case 'save':
        this.saveProfile(this.pF, this.svLevel);
        break;
      case 'delete':
        this.deleteProfile();
        break;
    }
  }

  searchProfile(searchParam: string) {
      this.groupMaintenance.hideAlerts();
      /*this.groupservice.getValidUserGroupName(profileName)
            .subscribe(response => {
               if (response.data) {
				 this.groupMaintenance.updateMessages( 'User Profile is not available. Please create it.', null, null);
				 this.toolBarService.setToolBarBehavior({disable:false});
               } else {
               	 this.toolBarService.setToolBarBehavior({disable:true});
				 this.groupMaintenance.updateMessages( 'User Profile is already available in system', null, null);
               }
            });*/
       this.groupservice.getProfilesByName(searchParam)
            .subscribe(items => {
                this.profiles = items.data;
                this.groupMaintenance.updateProfiles(this.profiles);
            });     
            
      
  }

  selectProfile(item: Object) {
    this.profileNames = item['usergroupName'];
    this.svLevels = item['supervisorLevel'];
    this.selectedUserGroupId = item['usergroupId'];
    console.log(this.svLevels);
    console.log(JSON.stringify(item));
    this.toolBarService.setToolBarBehavior({disable:false});
  }

  saveProfile(profileName: string, supervisorLevel: string) {
    this.groupMaintenance.hideAlerts();
  	if (profileName.trim().length <= 0) {
	  this.groupMaintenance.updateMessages( "Please enter a Valid User Group name.", null, null);
      return;
    }
     this.groupservice.getValidUserGroupName(profileName)
            .subscribe(response => {
               if (response.data) {
                  this.groupservice.saveUserGroup(profileName, supervisorLevel).subscribe(
			        result => {
			          if (result === true) {
            			this.clearData();
		      	      	this.groupMaintenance.updateMessages( null, null, "User Group " + profileName +" saved successfully");
			          }
			        }, err => {
		      		  this.groupMaintenance.updateMessages( null, 'Failed to process the request.', null);
			        }
			      );
               } else {
		      	 this.groupMaintenance.updateMessages( 'User Profile is already available in system', null, null);
               }
            });
    
    
    }
    
    
    setClickedRowProfile(i: number)  {
        this.groupMaintenance.hideAlerts();
       this.selectedRowProfile = i;
       this.disableEdit = false;
    }
    
    saveEditedProfile(profileName: string, supervisorLevel: string) {
      this.groupMaintenance.hideAlerts();
      if (this.profileNames.trim().length <= 0) {
		this.groupMaintenance.updateMessages("Please enter a Valid User Group name." , null, null);
        return;
      }
      this.groupservice.saveEditedUserGroup(profileName, supervisorLevel, this.selectedUserGroupId).subscribe(
        result => {
          if (result === true) {
		    this.groupMaintenance.updateMessages( null, null, "User profile saved successfully");
            this.clearData();
          }
        }, err => {
            this.groupMaintenance.updateMessages( null, 'Failed to process the request.', null);
        }
      );
    }
    
    deleteProfile() {
       this.groupMaintenance.hideAlerts();
      this.groupservice.isDeletePossible(this.selectedUserGroupId)
            .subscribe(response => {
               if (response.data) {
               		this.groupservice.deleteUserGroup(this.selectedUserGroupId).subscribe(
			        result => {
			          if (result === true) {
		      	 		this.groupMaintenance.updateMessages( null, null,  "User Profile is deleted.");
			            this.clearData();
			          }
			        }, err => {
			            this.groupMaintenance.updateMessages( null, 'Failed to process the request.', null);
			        }
			      );
               } else {
		      	 this.groupMaintenance.updateMessages( "User Profile deletion is not possible. User Profile is associated with multiple User.", null, null);
                  this.disableEdit = true;
                  this.selectedRowProfile = -1;
                  this.toolBarService.setToolBarBehavior({disable:true});
               }
            });
  	}
  	
  	clearData(){
  		 this.profiles = [];
         this.groupMaintenance.updateProfiles(this.profiles);
         this.toolBarService.setToolBarBehavior({disable:true});
         this.profileNames = "";
    	 this.svLevels = "";
    	 this.pF = "";
    	 this.svLevel = "";
    	 this.disableEdit = true;
    	 this.selectedRowProfile = -1;
    	 this.modules = [];
    	 this.entitlements  = [];
    	 this.groupMaintenance.updateModules(this.modules);
    	 this.groupMaintenance.updateEntitlements(this.entitlements);
    	 this.groupMaintenance.hideAlerts();
  	}
  	
  	enableSaveButton(){
  	    this.profiles = [];
  	    this.disableEdit = true;
  	    this.groupMaintenance.hideAlerts();
  		if (this.pF.trim().length === 0) {
	  		this.toolBarService.setToolBarBehavior({disable:true});
   		} else {
   			this.toolBarService.setToolBarBehavior({disable:false});
   		}
  	}
}