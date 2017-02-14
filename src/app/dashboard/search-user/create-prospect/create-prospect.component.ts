import { ClientModel } from '../../../_models/client.model';
import { ClientEnumReferenceService } from '../../../_services/client-enum-ref.service'
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Injectable } from '@angular/core';
import { SearchUserComponent } from '../search-user.component';
import { FormGroup, Validators, ReactiveFormsModule, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-createProspect',
  templateUrl: './create-prospect.component.html',
  styleUrls: ['./create-prospect.component.css'],
  providers: [FormBuilder]
})

@Injectable()
export class CreateProspectComponent implements OnInit {
  value: string;
  clientForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientEnumRefService: ClientEnumReferenceService,
    private clientModel: ClientModel) { }



  ngOnInit() { }

  //Displays the Client Type Dropdown
  onSelect(value: string) {
    if (value === 'default'){
      this.router.navigateByUrl('/dashboard/search-user/create-prospect');
    }else{
      this.router.navigateByUrl('/dashboard/search-user/create-prospect/create-prospect-' + value);
     }
  }

}