import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ToolBarService } from '../../../_services/toolbar-actions.service';
import { UserMaintenanceService } from '../../../_services/user-maintenance.service';
import { UserMaintenanceModel } from '../../../_models/user-maintenance.model';

@Component({
  selector: 'app-fa-tab',
  templateUrl: './fa-tab.component.html',
  styleUrls: ['./fa-tab.component.css']
})
export class FaTabComponent implements OnInit, OnChanges {  
  @Input() userList: UserMaintenanceModel[];
  private subscription: Subscription;
  constructor(
    private toolBarService: ToolBarService,
    private userMaintenanceService: UserMaintenanceService) { }

  ngOnInit() {
    this.subscription = this.toolBarService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.module === 'fa') {
        console.log(res.module);
      }
    });
      console.log("User List from FA tab : " + JSON.stringify(this.userList));
  }
  
  ngOnChanges(){
  
  }
}
