import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { SearchUserComponent } from '../search-user.component';
import { FormGroup, Validators, ReactiveFormsModule, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { stringify } from 'querystring';
import { ClientModel } from '../../../_models/client.model';
import { ClientDetailsService } from '../../../_services/client-details.service';
import { ClientEnumReferenceService } from '../../../_services/client-enum-ref.service';
import { ClientAddressDetModel } from '../../../_models/client-address-det.model';
import { ClientExtModel } from '../../../_models/client-ext.model';

@Component({
  selector: 'app-clientProspectDetails',
  templateUrl: './client-prospect-details.component.html',
  styleUrls: ['./client-prospect-details.component.css']  
})

export class ClientProspectDetailsComponent implements OnInit {
   createIndivForm: FormGroup;
   clientIdNo: string;
  private subscription: Subscription;  
  private countryArray: Array<any>;
  private educationLevelArray: Array<any>;
  private employmentStatusArray: Array<any>; 
  private objArray: Array<any>;
  private results: Array<any>;
  
  constructor(private enumService: ClientEnumReferenceService,
    private formBuilder: FormBuilder,
    private clModel : ClientModel,
     private clientDetailsService: ClientDetailsService,
     private route: ActivatedRoute){}
  
  ngOnInit() {
    this.getAllDropdownValues();
    this.clModel = new ClientModel();
	this.clModel.clientExt = new ClientExtModel();
	this.clModel.clientAddressDet = [];
	this.clModel.clientAddressDet.push(new ClientAddressDetModel());
    this.route
      .params
      .subscribe(params => {
        this.clientIdNo = params['id'];
        this.clientDetailsService.getClientDetailsById(this.clientIdNo).subscribe(items => {
	        this.clModel = items.data;
	        this.getGender(this.clModel["clientGenderId"]);
	        this.getClientGroup(this.clModel["clientTypeInd"]);
	        this.getAccreditedInvestor(this.clModel["clientAiInd"]);
	        this.getUSCitizen(this.clModel["clientUsInd"]);
            this.getBlackListed(this.clModel["clientBlacklistInd"]);
            this.getClientStatus(this.clModel["clientAdviceInd"]);
      	});
      });
  }
  
  getGender(genderId : number){
  
  	if(genderId === 1 ){
  		this.clModel["clientGenderDesc"] = "Male";
  	} else if(genderId === 2 ){
  		this.clModel["clientGenderDesc"] = "Female";
  	} 
  }
  
  getClientGroup(clientTypeInd : number){
  
  	if(clientTypeInd === 0 ){
  		this.clModel["clientTypeIndDesc"] = "Individual";
  	} else if(clientTypeInd === 1 ){
  		this.clModel["clientTypeIndDesc"] = "Non-Individual";
  	} 
  }
  
  
  getAccreditedInvestor(clientAiInd : boolean){
  
  	if(clientAiInd){
  		this.clModel["clientAiIndDesc"] = "Yes";
  	} else {
  		this.clModel["clientAiIndDesc"] = "No";
  	} 
  }
  
  
   getUSCitizen(clientUsInd : boolean){
  
  	if(clientUsInd){
  		this.clModel["clientUsIndDesc"] = "Yes";
  	} else {
  		this.clModel["clientUsIndDesc"] = "No";
  	} 
  }
  
  getClientStatus(clientAdviceInd : string){
  	if(clientAdviceInd === 'P'){
  		this.clModel["clientAdviceIndDesc"] = "Prospect";
  	} else {
  		this.clModel["clientAdviceIndDesc"] = "Client";
  	} 
  }
  
  getBlackListed(clientBlacklistInd : boolean){
    if(clientBlacklistInd){
      this.clModel["clientBlacklistIndDesc"] = "Yes";
    } else {
      this.clModel["clientBlacklistIndDesc"] = "No";
    } 
  }
  
  saveIndClientProspect(){
  	this.clientDetailsService.saveClientModelInd(this.clModel).
	      subscribe(items => {
	          console.log("Success");
	      }, err => {
	       
	      });
  }
  
  
   private getAllDropdownValues(): void {
    this.results = [];
    this.enumService.getAllDropDownValues().subscribe(
      result => {
        //Employment Status
        this.employmentStatusArray = result.data['1012'];

        //EducationLevel
        this.educationLevelArray = result.data['1015'];

        //Country Array
        this.countryArray = result.data['1021'];


        this.results = this.objArray;

      }, err => {
        alert('failed');
      }
    );
  }
 
}