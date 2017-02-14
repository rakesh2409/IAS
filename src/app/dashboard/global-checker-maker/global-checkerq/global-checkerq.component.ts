import { Component, OnInit, Input } from '@angular/core';
import { CheckerMakerService } from '../../../_services/checker-maker.service';
import { UserMaintenanceService } from '../../../_services/user-maintenance.service';
import { GroupService } from '../../../_services/group-service';
@Component({
  selector: 'app-global-checkerq',
  templateUrl: './global-checkerq.component.html',
  styleUrls: ['./global-checkerq.component.css']
})
export class GlobalCheckerqComponent implements OnInit {
  private activeRowIndex: number;
  private checkerData= [];
  private error: string;
  private successMsg: string;
  private infoMsg: string; 
  @Input() checkerMakerData= [];
  constructor(private checkerMakerService: CheckerMakerService,
          private userMaintenanceService: UserMaintenanceService,
          private groupService: GroupService) { }

  ngOnInit() {
      this.getCheckerData();
  }
  
  getCheckerData() {
      this.checkerMakerData = [];
      this.checkerMakerService.getCheckerMakerQueue()
      .subscribe( response => {
          this.checkerMakerData = response.data;
          this.filterCheckerData();
      });
  }
  
  filterCheckerData() {
      this.checkerData = [];
      for (let i=0; i<(this.checkerMakerData.length); i++){
          let data = this.checkerMakerData[i];
          if (!data.makerFlag) {
            let temp:string = data.createDtm;
            data.createDtm = this.formatDate(data.createDtm)
            data.version = this.formatTime(temp)    
            this.checkerData.push(data);
          } 
      }
  }
  
  updateRequestStatus(status: string, moduleId: string, 
          userName: string, moduleName: string) {     
      this.hideAlerts();
      if(moduleId != null){
          
          if (moduleName === 'group-maintenance'){
              this.groupService.updateStatus(Number(moduleId), status).subscribe(
                      result => {});
          } else if (moduleName === 'user-maintenance') {
              this.userMaintenanceService.updateUserRequest(moduleId, status).
              subscribe(result => {
                  if(result === true){
                      this.successMsg = 'Request '+ status +' for ' + userName;
                      this.getCheckerData();
                  }
              }, err => {
                      this.error = err;
              });
          }
      } else {
          this.error = 'moduleID is null';
      }
  }
  
  hideAlerts() {
      this.infoMsg = null;
      this.error = null;
      this.successMsg = null;
  }
  
  formatDate(dtm: string) : string {
      return dtm.substring(0,10);
  }
  
  formatTime(dtm: string): string {
      return dtm.substring(11,19);
  }
  
  setActiveRow(index: number) {
      this.activeRowIndex = index;
  }
}
