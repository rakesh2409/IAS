import { Component, OnInit, Input, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ToolBarService } from '../../../_services/toolbar-actions.service';
import { UserMaintenanceService } from '../../../_services/user-maintenance.service';
import { UserMaintenanceModel } from '../../../_models/user-maintenance.model';
import { AUTHORIZED_PRODUCTS } from '../../../_models/authorized-products.model';
import { stringify } from 'querystring'
import { Router, RouterModule,ActivatedRoute  } from '@angular/router';
import { ErrorComponent } from '../../../error/error.component';
@Component({
  selector: 'app-userid-tab',
  templateUrl: './userid-tab.component.html',
  styleUrls: ['./userid-tab.component.css']
})
export class UseridTabComponent implements OnInit, OnDestroy {
  private subscription: Subscription;  
  private userLoginId: any;
  private disableRecord: boolean = false;
  private disableField: boolean = false;
  private hideApproveReject: boolean = true;
  private activeRowIndex: number; 
  private products = AUTHORIZED_PRODUCTS;
  private error: string;
  private successMsg: string;
  private infoMsg: string; 
  @ViewChild('submitButton') submitButton:ElementRef;
  @Input() profiles: Array<any>;
  @Input() userList: UserMaintenanceModel[];
  constructor(
    private toolBarService: ToolBarService,
    private userMaintenanceService: UserMaintenanceService,
    private userModel: UserMaintenanceModel,
    private route: ActivatedRoute,
    private errorHandler: ErrorComponent,
    private router: Router) { }

  ngOnInit() {
      this.route
          .params
          .subscribe(params => {
              this.userLoginId = params['id'];
               if (this.userLoginId != null && this.userLoginId != 0) {
                   this.userMaintenanceService.getUserDetails(this.userLoginId, 'SUBMITTED').
                   subscribe(items => {
                       this.hideAlerts();
                       this.clearFields();
                       this.userModel = items.data;
                       this.disableRecord = items.disableRecord;
                       this.hideApproveReject = items.hideApprove;
                       this.updateToolBarBehavior();
                       this.disableField = true;
                       this.mapProducts();
                       this.formatDates();
                       if(items['messages'] != null && items['messages'].length > 0){
		                   this.infoMsg = (items['messages'][0]);
		               }
                       for (let i=0; i<(this.profiles.length); i++){
                           if (this.profiles[i].usergroupName === this.userModel.userGroupName){
                               this.userModel.usergroupId = this.profiles[i].usergroupId;
                           }
                       }
                   });
               } else {
                   this.disableField = false;
                   this.toolBarService.setToolBarBehavior({disable:false});
               } 
      });
        this.subscription = this.toolBarService.notifyObservable$.subscribe((res) => {
          if (res.module === 'user-id') {
            this.mapActions(res.option);
          }
        });
  }
  
  mapActions(option: string) {
      
      console.log(option);
      switch(option) {
        case 'save':
          this.validateForm();
          break;
        case 'delete':
          this.deleteUserDetails();
          break;
        case 'add':
          this.disableField = false;
          break;
      }
    }
  
  ngOnDestroy() {
      this.subscription.unsubscribe();
      console.log('onDestroy');
  }
  

  updateRequest(status: string) {
      this.hideAlerts();
      if(this.userLoginId != null || this.userLoginId != 0){
          this.userMaintenanceService.updateUserRequest(this.userLoginId, status).
          subscribe(result => {
              if(result === true){
                  this.successMsg = 'Status updated!';
                  this.disableRecord = false;
                  this.hideApproveReject = true;
                  this.clearFields();
              }
          }, err => {
              
          });
      }    
  }
  
  unlockData() {
      this.hideAlerts();
      if(this.userLoginId != null || this.userLoginId != 0){
          this.userMaintenanceService.unlockData(this.userLoginId).
          subscribe(result => {
              if(result === true){
                  this.hideApproveReject = true;
                  this.router.navigate(['/dashboard/checker-maker/global-checker']);
              }
          }, err => {
              
          });
      }    
  }
  
  updateToolBarBehavior() {
      this.toolBarService.setToolBarBehavior({disable:this.disableRecord});
  }
  
  mapUserGroup(userGroupName: string){
      
      for (let i=0; i<(this.profiles.length); i++){
          if (this.profiles[i].usergroupName === userGroupName){
              this.userModel.usergroupId = this.profiles[i].usergroupId;
          }
      }
      console.log('User group Id: '+this.userModel.usergroupId);
  }
      
   
  mapProducts() {
      this.uncheckProducts();
      for (let i=0;i<(this.products.length);i++){
          for (let x=0;x<(this.userModel.userProductMap.length);x++){
              if (this.products[i].code === this.userModel.userProductMap[x].code) {
                  this.products[i].checked = true;
                  break;
              }
          }
      }
  }
      
  uncheckProducts(){
      for (let i=0;i<(this.products.length);i++){
          this.products[i].checked = false;
      }
  }
  
  clearFields() {
      this.disableRecord = false;
      this.disableField = false;
      this.uncheckProducts();
      this.userModel = new UserMaintenanceModel();
      this.userList = []; 
  }
      
  isValidCheckedProducts() : boolean {
      this.userModel.userProductMap = [];
      for (let i=0;i<(this.products.length);i++){
          if (this.products[i].checked){
              if (this.products[i].code === 'INS' && this.userModel.agentCode === null){
                  this.error = 'Agent Code is required when selecting the Insurance product.';
                  return false;
              }
              let prod : Object = {
                  code: this.products[i].code,
                  description: this.products[i].name
              }
              this.userModel.userProductMap.push(prod);             
          }
      }
      return true;
  }
  
  isValidRep() : boolean {
      if (this.userModel.selectedRep === 'Yes'){
          if (this.userModel.userEffectiveFromDt === null || this.userModel.userEffectiveToDt === null){
              this.error = 'From Date and To Date fields are required when Selected Rep is set to YES';
              return false;
          }
      }
      return true;
  }
  
  findUserId(searchId: string){
      this.hideAlerts();
      this.userList = []; 
      this.userMaintenanceService.getUserDetailsById(searchId).
         subscribe(items => {
             if (items.data.length > 0) {
                 this.clearFields();
                 this.disableRecord = items.disableRecord;
                 this.hideApproveReject = items.hideApprove;
                 this.updateToolBarBehavior();
                 this.userList = items.data;
                 //this.mapProducts();
                 //this.formatDates();
                 this.successMsg = 'Found '+items.data.length+' user details for key \''+searchId+'\'';
             } else {
                 this.error = 'User details for key \''+searchId+'\' does not found.';
                 this.clearFields();
             }             
          }, err => {
                 this.error = err;
                 this.clearFields();                    
         }); 
  }
      
  deleteUserDetails() {}
  
  submitForm() {
    this.hideAlerts();  
    this.userMaintenanceService.isUserLoginIdValid(
       this.userModel.userLoginId).subscribe(
        result =>{
          if (result && !this.disableField) {
            this.error = 'User ID already exist';
            return;
          } else {
            this.error = null;
            if (this.isValidCheckedProducts()) {
                if (this.isValidRep()) {
                   this.userMaintenanceService.createUser(this.userModel).subscribe(
                    result => {
                        if (result === true) {    
                        this.clearFields();
                        this.successMsg = "User saved.";
                    }}, err => {
                        this.error = err;
                    });                   
                }   
            }
          }
      });
  }
  
  
  
  validateForm() {
      console.log('validateForm');
      this.submitButton.nativeElement.click();
      //this.submitButton.trigger('click');
      //this.submitForm();
  }
  
  formatDates() {
      if (this.userModel.userEffectiveFromDt != null) {
          this.userModel.userEffectiveFromDt = this.userModel.userEffectiveFromDt.substring(0,10);
      }     
      if (this.userModel.userEffectiveToDt != null ){
          this.userModel.userEffectiveToDt = this.userModel.userEffectiveToDt.substring(0,10);
      }   
      this.userModel.createDtm = this.userModel.createDtm.substring(0,10);
      this.userModel.lastUpDateDtm = this.userModel.lastUpDateDtm.substring(0,10);
  }
  
  setActiveRow(index: number) {
      this.activeRowIndex = index;
  }
  
  hideAlerts() {
      this.infoMsg = null;
      this.error = null;
      this.successMsg = null;
  }
  
  selectUserRow(users: UserMaintenanceModel) {
        this.hideAlerts();
        this.userModel = users;
        this.userMaintenanceService.getUserDetails(this.userModel.userLoginId, 'APPROVED').
	       subscribe(items => {
	           this.userModel = new UserMaintenanceModel();
	           this.disableRecord = items.disableRecord;
	           this.hideApproveReject = items.hideApprove;
	           this.updateToolBarBehavior();
	           this.userModel = items.data;
	           this.mapProducts();
	           this.disableField = true;
	           this.formatDates();
	           if(items['messages'] != null && items['messages'].length > 0){
                   this.infoMsg = (items['messages'][0]);
               }
	           for (let i=0; i<(this.profiles.length); i++){
                   if (this.profiles[i].usergroupName === this.userModel.userGroupName){
                       this.userModel.usergroupId = this.profiles[i].usergroupId;
                   }
    	       }
	       }); 
  }

}
