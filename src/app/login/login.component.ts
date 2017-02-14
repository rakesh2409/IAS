import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { ErrorComponent } from '../error/error.component';
import { UserService } from '../_services/user.service';
import { ModuleConst } from '../../data/const';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model : any ={};
  loading = false;
  error : string;

  constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private testError : ErrorComponent,
        private userService: UserService
  ) { }

  ngOnInit() {
     // reset login status
    this.authenticationService.logout();
  }

  login(){
    this.authenticationService.login(this.model.username, this.model.password).subscribe(
      result => {
        if(result === true){
          //login succesfully
          this.userService.getUserMenus()
            .subscribe(menu => {
                localStorage.setItem('menus', JSON.stringify(menu.data));
          });
          this.userService.getUserComponents(this.model.username).subscribe(userDetails => {
                localStorage.setItem('cache_components', JSON.stringify(userDetails.data.moduleComponentMap));
                localStorage.setItem('user', JSON.stringify(userDetails.data));
                this.router.navigate(['/dashboard']);
           });
        }
      }, err => {
                this.error = err;
      }
    );
  }

}
