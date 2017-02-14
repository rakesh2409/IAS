import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GroupService } from '../../_services/group-service';
import { Subscription } from 'rxjs/Subscription';
import { ToolBarService } from '../../_services/toolbar-actions.service';
import { UserMaintenanceService } from '../../_services/user-maintenance.service';
import { UserMaintenanceModel } from '../../_models/user-maintenance.model';
@Component({
  selector: 'app-user-maintenance',
  templateUrl: './user-maintenance.component.html',
  styleUrls: ['./user-maintenance.component.css']
})
export class UserMaintenanceComponent implements OnInit, AfterViewInit {
  private profiles: Array<any>;
  private userList: UserMaintenanceModel[];
  private subscription: Subscription;
  
  constructor(
    private groupService: GroupService,
    private toolBarService: ToolBarService, 
    private userMaintenanceService: UserMaintenanceService) {}

  ngOnInit() {
    this.groupService.getProfiles()
      .subscribe(items => {
        this.profiles = items;
      });
    this.userMaintenanceService.getUserList()
        .subscribe(res => {
        this.userList = res;
            console.log(JSON.stringify(this.userList));
    });
  }
  ngAfterViewInit() {
    this.activeTab('user-id');
  }
  activeTab(tab: string) {
    this.toolBarService.notfyToolBar({module: tab});
  }

}
