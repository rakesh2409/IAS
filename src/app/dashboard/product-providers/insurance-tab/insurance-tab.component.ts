import { Component, OnInit, Input, OnDestroy, ElementRef, ViewChild, AfterViewChecked, Renderer  } from '@angular/core';
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
  selector: 'app-insurance-tab',
  templateUrl: './insurance-tab.component.html',
  styleUrls: ['./insurance-tab.component.css']
})
export class InsuranceTabComponent implements OnInit, OnDestroy  {
  private insurerList : Array<any>;
  private subscription: Subscription;  
  private activeRowIndex: number; 
  private disableField: boolean = false;
  private ppName :  string = null;
  private disableRecord: boolean = false;
  private hideApproveReject: boolean = true;
  constructor(private ppService : ProductProviderService,
  	private toolBarService: ToolBarService,
    private ppInsModel: ProductProviderModel,
    private route: ActivatedRoute,
    private errorHandler: ErrorComponent,
    private router: Router,
    private ppMaintenance : ProductProvidersComponent) { }
  
  ngOnInit() {
  
     this.route
          .params
          .subscribe(params => {
              if (params['id'] != null && params['id'] != "0") {
                   this.ppName = params['id'].split(":")[1];
                   if(params['id'].split(":")[0] === "INS"){   
	                   this.ppService.getProductProviderByName(this.ppName, "SUBMITTED").
					       subscribe(items => {
					           this.ppInsModel = items.data;
			               	    this.disableRecord = items.disableRecord;
	                       		this.hideApproveReject = items.hideApprove;
	                       		this.updateToolBarBehavior();
	                       		this.disableField = true; 
                   	   			this.ppMaintenance.updateActiveClass();
                   	   			if(items['messages'] != null && items['messages'].length > 0){
						                 this.ppMaintenance.updateMessages( items['messages'][0], null, null);
			               	   }
		       			}); 
		       		}
               } else {
                   this.disableField = false;
                   this.toolBarService.setToolBarBehavior({disable:false});
               } 
      });
  	 this.subscription = this.toolBarService.notifyObservable$.subscribe((res) => {
          if (res.module === 'insurance') {
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

  searchInsurer(searchParam: string) {
        this.ppMaintenance.hideAlerts();
      
       this.ppService.getProductProvider(searchParam, "INS")
            .subscribe(items => {
                this.insurerList = items.data;
            });     
            
      
  }
  
  setActiveRow(index: number) {
      this.activeRowIndex = index;
  }
  
   selectINSRow(items : ProductProviderModel) {
        this.ppMaintenance.hideAlerts();
        this.ppService.getProductProviderByName(items.providerName, "APPROVED").
	       subscribe(items => {
	           this.ppInsModel = items.data;
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
    	this.ppName = this.ppInsModel['providerName'];
     	this.ppService.deleteProductProvider(this.ppInsModel['providerName']).subscribe(
			        result => {
			          if (result === true) {
			            this.clearFields();
		      	 		this.ppMaintenance.updateMessages( null, null,  "Product Provider:"+this.ppName+ " is deleted.");
		      	 		this.ppName = null;
			          }
			        }, err => {
			            this.ppMaintenance.updateMessages( null, 'Failed to process the request.', null);
			        }
			      );
    }
    
    
    savePP(){
        this.ppMaintenance.hideAlerts();
    	this.ppInsModel.productTypeCd = "INS";
    	this.ppInsModel.productType = "Insurance";
    	this.ppService.createProductProvider(this.ppInsModel).subscribe(
                    result => {
                        if (result === true) { 
                        this.ppMaintenance.updateMessages( null, null, "Product provider saved : "+this.ppInsModel['providerName']);   
                        this.ppInsModel = new ProductProviderModel();
    					this.disableField = false;
    					this.insurerList = [];
                    }}, err => {
                        this.ppMaintenance.updateMessages( null, "Error saving.", null);   
                    }); 
    }
    
    clearFields(){
        this.ppMaintenance.hideAlerts();
    	this.ppInsModel = new ProductProviderModel();
    	this.disableField = false;
    	this.insurerList = [];
    }
    
    
    updateRequest(status: string) {
      this.ppMaintenance.hideAlerts();
      if(this.ppName != null || this.ppName != "0"){
          this.ppService.updatePPRequest(this.ppName, status).
          subscribe(result => {
              if(result === true){
                  this.ppMaintenance.updateMessages( null, null, 'Status updated!');  
                  this.disableRecord = false;
                  this.hideApproveReject = true;
                  this.ppInsModel = new ProductProviderModel();
    			  this.disableField = false;
    			  this.insurerList = [];
              }
          }, err => {
              
          });
      }    
   }
   
   
   unlockData() {
      this.ppMaintenance.hideAlerts();
      if(this.ppName != null || this.ppName != "0"){
          this.ppService.unlockData(this.ppName).
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
