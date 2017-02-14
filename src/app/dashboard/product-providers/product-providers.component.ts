import { Component, OnInit, AfterViewInit, ViewChild, Renderer, ElementRef  } from '@angular/core';
import { ProductProviderService } from '../../_services/product-provider.service';
import { Subscription } from 'rxjs/Subscription';
import { ToolBarService } from '../../_services/toolbar-actions.service';
import { ErrorComponent } from '../../error/error.component';


@Component({
  selector: 'app-product-providers',
  templateUrl: './product-providers.component.html',
  styleUrls: ['./product-providers.component.css']
})
export class ProductProvidersComponent implements OnInit, AfterViewInit {
  isClassVisible : boolean = true;
  error: string;
  successMsg: string;
  infoMsg: string; 
  @ViewChild('insuranceTab') insuranceLink :ElementRef;
  
  constructor(private ppService : ProductProviderService, private toolBarService : ToolBarService, private errorHandler: ErrorComponent,
    private renderer:Renderer) { }

  ngOnInit() {
  	this.isClassVisible = true;
  }
  
  setActiveTab(tab: string) {
    this.hideAlerts();
    this.toolBarService.notfyToolBar({module: tab});
  }
  
  
  ngAfterViewInit() {
    this.setActiveTab('unit-trust')
  }


  updateMessages(infoMsg : string, error:string, successMsg: string){
   	  this.infoMsg = infoMsg;
      this.error = error;
      this.successMsg = successMsg;
  }
  
   hideAlerts() {
      this.infoMsg = null;
      this.error = null;
      this.successMsg = null;
    }
    
    updateActiveClass(){
		let event = new MouseEvent('click', {bubbles: true});
	    this.renderer.invokeElementMethod(
	        this.insuranceLink.nativeElement, 'dispatchEvent', [event]);   
    }
}
