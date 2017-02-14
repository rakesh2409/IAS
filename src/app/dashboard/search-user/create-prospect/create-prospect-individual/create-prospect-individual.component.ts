import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { SearchUserComponent } from '../../search-user.component';
import { FormGroup, Validators, ReactiveFormsModule, FormBuilder, FormControl } from '@angular/forms';
import { ClientEnumReferenceService } from '../../../../_services/client-enum-ref.service';
import { ClientModel } from '../../../../_models/client.model';
import { ClientAddressDetModel } from '../../../../_models/client-address-det.model';
import { ClientExtModel } from '../../../../_models/client-ext.model';
import { ClientDetailsService } from '../../../../_services/client-details.service'

@Component({
  selector: 'app-createProspectIndiv',
  templateUrl: './create-prospect-individual.component.html',
  styleUrls: ['./create-prospect-individual.component.css'],
  providers: [FormBuilder],
})

export class CreateProspectIndivdualComponent implements OnInit {
  private dataObj: Array<any>;
  private countryArray: Array<any>; // gets the Country in enum_ref_code table
  private educationLevelArray: Array<any>; // gets the Highest Educational Level from enum_ref_code table
  private salutationArray: Array<any>; // gets the salutation from enum_ref_code table
  private segmentArray: Array<any>;
  private employmentStatusArray: Array<any>; //gets the employment status from enum_ref_code table 
  private idTypeArray: Array<any>; //gets the ID Type Array from enum_ref_code table
  private objArray: Array<any>;
  private results: Array<any>;
  private searchTerm: string;
  createIndivForm: FormGroup;

  constructor(
    private enumService: ClientEnumReferenceService,
    private formBuilder: FormBuilder,
    private clientModel: ClientModel,
     private clientDetailsService: ClientDetailsService) { }

  ngOnInit() {
    console.log('init - ind');
    this.getAllDropdownValues();
    //validates the required field
    this.createIndivForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      idType: ['', Validators.required],
      idNo: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      nationality: ['', Validators.required],
      address: ['', Validators.required],
      mobileNo: ['', Validators.required],
      maritalStatus: ['', Validators.required]

    });
    this.clientModel = new ClientModel();
    this.clientModel.clientAddressDet = [];
    this.clientModel.clientAddressDet.push(new ClientAddressDetModel());
    console.log( this.clientModel.clientAddressDet);
    this.clientModel.clientExt = new ClientExtModel();
  }
  
  private saveIndClientProspect(){
    this.clientModel["clientTypeInd"] = 0;
    this.clientModel["clientAdviceInd"] = "P";
  	this.clientDetailsService.saveClientModelInd(this.clientModel).
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

}