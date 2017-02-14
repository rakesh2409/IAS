import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { SearchUserComponent } from '../../search-user.component';
import { CreateProspectComponent } from '../create-prospect.component'
import { FormGroup, Validators, ReactiveFormsModule, FormBuilder, FormControl } from '@angular/forms';
import { ClientEnumReferenceService } from '../../../../_services/client-enum-ref.service';
import { ClientModel } from '../../../../_models/client.model';
import { ClientAddressDetModel } from '../../../../_models/client-address-det.model';
import { ClientExtModel } from '../../../../_models/client-ext.model';
import { ClientDependentExtModel } from '../../../../_models/client-dependent-ext.model';
import { ClientDetailsService } from '../../../../_services/client-details.service'

@Component({
  selector: 'app-createProspectNonIndiv',
  templateUrl: './create-prospect-non-individual.component.html',
  styleUrls: ['./create-prospect-non-individual.component.css'],
  providers: [FormBuilder],
  
})

export class CreateProspectNonIndivdualComponent implements OnInit {
  private dataObj: Array<any>;
  private countryArray: Array<any>; // gets the country from enum_ref_code table
  private educationLevelArray: Array<any>; //gets the educationalHighestLevel from enum_ref_code table
  private salutationArray: Array<any>; // gets the salutation from from enum_ref_code table
  private segmentArray: Array<any>; //gets the client segment  
  private objArray: Array<any>;
  private results: Array<any>;
  private employmentStatusArray: Array<any>; //gets the employment status from enum_ref_code table
  private idTypeArray: Array<any>; //gets the ID Type Array from enum_ref_code table

  constructor(private enumService: ClientEnumReferenceService,
    private clientModel: ClientModel,
     private clientDetailsService: ClientDetailsService) {
  }

  ngOnInit() {
    this.getAllDropdownValues();
    this.clientModel = new ClientModel();
    this.clientModel.clientAddressDet = [];
    this.clientModel.clientDependentExtDTO = [];
    this.clientModel.clientAddressDet.push(new ClientAddressDetModel());
    const clientDependent = new ClientDependentExtModel();
    clientDependent.clientAddressDet =  new ClientAddressDetModel();
    this.clientModel.clientDependentExtDTO.push(clientDependent);
    this.clientModel.clientExt = new ClientExtModel();
  }
  
  private addDirector(){
    const clientDependent = new ClientDependentExtModel();
    clientDependent.clientAddressDet =  new ClientAddressDetModel();
    this.clientModel.clientDependentExtDTO.push(clientDependent);
  }

  private getAllDropdownValues(): void {
    this.results = [];
    this.enumService.getAllDropDownValues().subscribe(
      result => {
        //Employment Status
        this.employmentStatusArray = result.data['1012'];

        //EducationLevel
        this.educationLevelArray = result.data['1015'];

        //Salutation
        this.salutationArray = result.data['1017'];

        //Segment
        this.segmentArray = result.data['1019'];

        //Country Array
        this.countryArray = result.data['1021'];

        //ID Type Array
        this.idTypeArray = result.data['1025'];

        this.results = this.objArray;

      }, err => {
        alert('failed');
      }
    );
  }
  
  private saveIndClientProspect(){
    this.clientModel["clientTypeInd"] = 1;
    this.clientModel["clientAdviceInd"] = "P";
  	this.clientDetailsService.saveClientModelInd(this.clientModel).
	      subscribe(items => {
	          console.log("Success");
	      }, err => {
	       
	      });
  }
  
  private removeDirector(index : number){
  	this.clientModel.clientDependentExtDTO.splice(index, 1);
  }
 
}

