import { Component, OnInit } from '@angular/core';
import { TopnavService } from './topnav-service';
import {Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css'],
    providers: [RouterModule ]
})
export class TopnavComponent implements OnInit {
	imageColor;
	messages;
  	topNavTitle = "Integrated Advisory Solution - Admin"; 
	topNavLogoUrl = "assets/img/maybank-logo.png";
	showLink = true;
	userName: string;
	isClassVisible = false;
	user = {};
	constructor( private topnavservice : TopnavService, private router: Router) { }
	
  	ngOnInit() {
  		setInterval(() => {
  			this.user = JSON.parse(localStorage.getItem('user'));
  			this.topnavservice.getNotifications(this.user['userGroupId'])
            .subscribe(item => {
                this.messages = item.data;
                this.imageColor = "#ff0000";
	  			this.showLink= true;
	  			this.isClassVisible = false;
            });
            
	  	 }, 10000);
  		
  		this.userName = JSON.parse(localStorage.getItem('user')).userName;
  	
  }
  
  showMessages(){
  		this.imageColor = "#707478";
  };
  
  showAllMessages(){
        this.user = JSON.parse(localStorage.getItem('user'));
  		this.topnavservice.getNotifications(this.user['userGroupId'])
            .subscribe(item => {
                this.messages = item.data;
               this.showLink= false;
  				this.isClassVisible = true;
            });
  		
  };
  
  showModule(moduleId:Number, moduleName:String){
  		//alert(moduleId+"::::"+moduleName);
  		 this.router.navigate(['group-mnt']);
  };
  
  
 
}
