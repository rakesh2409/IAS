import { Component, OnInit, Input, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ToolBarService } from '../../../_services/toolbar-actions.service';
import { ProductProviderService } from '../../../_services/product-provider.service';
import { ProductProviderModel } from '../../../_models/product-provider.model';
import { AUTHORIZED_PRODUCTS } from '../../../_models/authorized-products.model';
import { stringify } from 'querystring'
import { Router, RouterModule,ActivatedRoute  } from '@angular/router';
import { ErrorComponent } from '../../../error/error.component';
import { ProductProvidersComponent } from "../product-providers.component";


@Component({
  selector: 'app-unit-trust-tab',
  templateUrl: './unit-trust-tab.component.html',
  styleUrls: ['./unit-trust-tab.component.css']
})
export class UnitTrustTabComponent implements OnInit, OnDestroy  {
  private unitTrustList : Array<any>;
  private subscription: Subscription;  
  private activeRowIndex: number; 
  private disableField: boolean = false;
  private providerName :  string;
  private disableRecord: boolean = false;
  private hideApproveReject: boolean = true;
  constructor(private ppService : ProductProviderService,
  	private toolBarService: ToolBarService,
    private ppModel: ProductProviderModel,
    private route: ActivatedRoute,
    private errorHandler: ErrorComponent,
    private router: Router,
    private ppMaintenance : ProductProvidersComponent) { }
  
  ngOnInit() {
  
     this.route
          .params
          .subscribe(params => {
               
               if (params['id'] != null && params['id'] != "0") {
                   this.providerName = params['id'].split(":")[1];
                   if(params['id'].split(":")[0] === "UT"){         		
	                   this.ppService.getProductProviderByName(this.providerName, "SUBMITTED").
					       subscribe(items => {
					           this.ppModel = items.data;
			               	    this.disableRecord = items.disableRecord;
	                       		this.hideApproveReject = items.hideApprove;
	                       		this.updateToolBarBehavior();
	                       		if(items['messages'] != null && items['messages'].length > 0){
						                 this.ppMaintenance.updateMessages( items['messages'][0], null, null);
			               	   } 
	                       		 this.disableField = true;
		       			}); 
                   }
               } else {
                   this.disableField = false;
                   this.toolBarService.setToolBarBehavior({disable:false});
               } 
      });
  
  	 this.subscription = this.toolBarService.notifyObservable$.subscribe((res) => {
          if (res.module === 'unit-trust') {
            this.mapActions(res.option);
          }
        });
  }
  
  ngOnDestroy() {
      this.subscription.unsubscribe();
      console.log('onDestroy');
  }
  
  updateToolBarBehavior() {
      this.toolBarService.setToolBarBehavior({disable:this.disableRecord});
  }

  searchUnitTrust(searchParam: string) {
        this.ppMaintenance.hideAlerts();
      
       this.ppService.getProductProvider(searchParam, "UT")
            .subscribe(items => {
                this.unitTrustList = items.data;
            });     
            
      
  }
  
  setActiveRow(index: number) {
      this.activeRowIndex = index;
  }
  
   selectUTRow(items : ProductProviderModel) {
        this.ppMaintenance.hideAlerts();
        this.ppService.getProductProviderByName(items.providerName, "APPROVED").
	       subscribe(items => {
	           this.ppModel = items.data;
	           if(items['messages'] != null && items['messages'].length > 0){
                   this.ppMaintenance.updateMessages( items['messages'][0], null, null);
               }
		       this.disableRecord = items.disableRecord;
           	   this.hideApproveReject = items.hideApprove;
           	   this.updateToolBarBehavior();
           	   this.disableField = true;
	       }); 
  }
  
  
   mapActions(option: string) {
      
      console.log(option);
      switch(option) {
        case 'save':
          this.savePP();
          break;
        case 'delete':
          this.deletePP();
          break;
        case 'add':
          this.clearFields();
          break;
      }
    }
    
    
    deletePP(){
    	this.ppMaintenance.hideAlerts();
    	this.providerName = this.ppModel['providerName'];
     	this.ppService.deleteProductProvider(this.ppModel['providerName']).subscribe(
			        result => {
			          if (result === true) {
			            this.clearFields();
		      	 		this.ppMaintenance.updateMessages( null, null,  "Product Provider :"+this.providerName +" is deleted.");
		      	 		this.providerName  = null;
			          }
			        }, err => {
			            this.ppMaintenance.updateMessages( null, 'Failed to process the request.', null);
			        }
			      );
    }
    
    
    savePP(){
        this.ppMaintenance.hideAlerts();
    	this.ppModel.productTypeCd = "UT";
    	this.ppModel.productType = "Unit Trust";
    	this.ppService.createProductProvider(this.ppModel).subscribe(
                    result => {
                        if (result === true) { 
                        this.ppMaintenance.updateMessages( null, null, "Product provider saved : "+this.ppModel['providerName']);   
                        this.ppModel = new ProductProviderModel();
			            this.disableField = false;
			            this.unitTrustList = [];
                    }}, err => {
                        this.ppMaintenance.updateMessages( null, "Error saving.", null);   
                    }); 
    }
    
    clearFields(){
    	this.ppModel = new ProductProviderModel();
    	this.disableField = false;
    	this.unitTrustList = [];
        this.ppMaintenance.hideAlerts();
    }
    
    
    updateRequest(status: string) {
        this.ppMaintenance.hideAlerts();
      if(this.providerName != null || this.providerName != "0"){
          this.ppService.updatePPRequest(this.providerName, status).
          subscribe(result => {
              if(result === true){
                  this.ppMaintenance.updateMessages( null, null, 'Status updated!');  
                  this.disableRecord = false;
                  this.hideApproveReject = true;
                  this.ppModel = new ProductProviderModel();
			      this.disableField = false;
			      this.unitTrustList = [];
              }
          }, err => {
              
          });
      }    
   }
   
   unlockData() {
      this.ppMaintenance.hideAlerts();
      if(this.providerName != null || this.providerName != "0"){
          this.ppService.unlockData(this.providerName).
          subscribe(result => {
              if(result === true){
                  this.hideApproveReject = true;
                  this.router.navigate(['/dashboard/checker-maker/global-checker']);
              }
          }, err => {
              
          });
      }    
  }
    
}
