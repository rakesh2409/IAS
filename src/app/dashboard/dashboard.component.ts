import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
users : any [] =[];
  constructor( private userservice : UserService) { }

  ngOnInit() {
        //this.userservice.getUsers()
           //  .subscribe(users => {
          //       this.users = users;
          //   });

  }
}
