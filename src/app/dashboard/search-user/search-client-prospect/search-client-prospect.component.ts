import { ClientModel } from '../../../_models/client.model';
import { ClientDetailsService } from '../../../_services/client-details.service';
//import { UserMaintenanceModel } from '../../../_models/user-maintenance.model';
import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ErrorComponent } from '../../../error/error.component';
import { ToolBarService } from '../../../_services/toolbar-actions.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-client-prospect',
  templateUrl: './search-client-prospect.component.html',
  styleUrls: ['./search-client-prospect.component.css']
})

export class SearchClientProspectComponent implements OnInit {
  listOfJoints: Array<any>;
  private error: string;
  private successMsg: string;
  private infoMsg: string;
  private disableRecord: boolean = true;
  @Input() clientList: Array<any> = [];
  public newBackClientDet: string;
  mainClientList :  Array<any> = [];
  private searchMain : boolean = true;

  constructor(private toolBarService: ToolBarService,
    private clientDetailsService: ClientDetailsService,
    private clientModel: ClientModel,
    private route: ActivatedRoute,
    private errorHandler: ErrorComponent,
    private router: Router,
  ) { }

  ngOnInit() {
    this.listOfJoints = [
      {
        jointId : '',
        jointName: '',
        show: false
      },
      {
        jointId: '',
        jointName: '',
        show: false
      },
      {
        jointId: '',
        jointName: '',
        show: false
      }
    ];

    

  }

  addJoint(): void {
    for (let cnt = 0; cnt < this.listOfJoints.length; cnt++) {
      if (!this.listOfJoints[cnt].show) {
        this.listOfJoints[cnt].show = true;
        this.searchMain = false;
        break;
      }
    }
  }
  removeJoint(i: number) {
    this.listOfJoints[i].show = false;
   	if(!this.listOfJoints[0].show && !this.listOfJoints[1].show && !this.listOfJoints[2].show){
         this.searchMain = true;
    }
  }

  isEmptyCriteria(criteria: string): any {
    if (criteria === null) {
      return true;
    }
    else {
      return false;
    }
  }

  hideAlerts() {
    this.infoMsg = null;
    this.error = null;
    this.successMsg = null;
  }

  findClientIdAndName(searchId: string, searchName: string) {
    //this.clearFields();
    if (this.clientList.length > 0 && !this.searchMain) {
      for (let j = 0; j < (this.listOfJoints.length); j++) {
            if(this.listOfJoints[j]["jointId"]=== undefined || this.listOfJoints[j]["jointId"].trim().length <= 0){
            	this.listOfJoints[j]["jointId"] = '0';
            }
      }
      this.clientDetailsService.getJointSearchDetails(this.listOfJoints).
        subscribe(items => {
          this.clientList = [];
          for (let k = 0; k < (this.mainClientList.length); k++) {
            this.clientList.push(this.mainClientList[k]);
          }
          
	      for (let i = 0; i < (items.data.length); i++) {
            this.clientList.push(items.data[i]);
          }
        }, err => {
          this.error = err;
          this.clearFields();
        });
    } else {
      if (searchId === undefined || searchId.trim().length <= 0) {
        searchId = '0';
      }
      this.hideAlerts();
      this.clientList = [];
      this.clientDetailsService.getClientDetailsByIdOrName(searchId, searchName).
        subscribe(items => {
          if (items.data.length > 0) {
            this.clearFields();
            this.clientList = items.data;
            this.mainClientList = items.data;
            this.successMsg = 'Found ' + items.data.length + ' client details ';
          } else {
            this.error = 'Client details for key \'' + searchId + '\' does not found.';
            this.clearFields();
          }
        }, err => {
          this.error = err;
          this.clearFields();
        });
    }

  }

  clearFields() {
    this.clientModel = new ClientModel();
    this.clientList = [];
  }

  selectedClientRow(clientId: string) {
    this.hideAlerts();
    this.clientList = [];
   	this.router.navigate(['/dashboard/search-user/client-prospect-details/' + clientId]);
  }
  updateToolBarBehavior() {
    this.toolBarService.setToolBarBehavior({ disable: this.disableRecord });
  }

}